import Task from "../models/Task.js";

/* ================================
   GET /report/last-week
   Tasks completed in last 7 days
================================ */
export const getTasksCompletedLastWeek = async (req, res) => {
  try {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const tasks = await Task.find({
      status: "Completed",
      updatedAt: { $gte: lastWeek },
    })
      .populate("project", "name")
      .populate("team", "name")
      .populate("owners", "name email");

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch last week completed tasks",
      error: error.message,
    });
  }
};

/* ================================
   GET /report/pending
   Total pending work (in days)
================================ */
export const getTotalPendingWork = async (req, res) => {
  try {
    const result = await Task.aggregate([
      {
        $match: { status: { $ne: "Completed" } },
      },
      {
        $group: {
          _id: null,
          totalPendingDays: { $sum: "$timeToComplete" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      totalPendingDays: result[0]?.totalPendingDays || 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to calculate pending work",
      error: error.message,
    });
  }
};

/* =========================================
   GET /report/closed-tasks?groupBy=
   groupBy = team | owner | project
========================================= */
export const getClosedTasksGrouped = async (req, res) => {
  const { groupBy } = req.query;

  const groupMap = {
    team: "$team",
    owner: "$owners",
    project: "$project",
  };

  if (!groupMap[groupBy]) {
    return res.status(400).json({
      success: false,
      message: "Invalid groupBy. Use team | owner | project",
    });
  }

  try {
    const pipeline = [{ $match: { status: "Completed" } }];

    // owners is an array → unwind
    if (groupBy === "owner") {
      pipeline.push({ $unwind: "$owners" });
    }

    pipeline.push(
      {
        $group: {
          _id: groupMap[groupBy],
          closedTasks: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from:
            groupBy === "team"
              ? "teams"
              : groupBy === "owner"
              ? "users"
              : "projects",
          localField: "_id",
          foreignField: "_id",
          as: "details",
        },
      },
      { $unwind: "$details" },
      {
        $project: {
          _id: 0,
          id: "$details._id",
          name: "$details.name",
          closedTasks: 1,
        },
      }
    );

    const result = await Task.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      groupBy,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch closed task report",
      error: error.message,
    });
  }
};
