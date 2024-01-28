const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// // Aggregate function to get the number of students overall
// const headCount = async () => {
//   const numberOfStudents = await Student.aggregate()
//     .count('studentCount');
//   return numberOfStudents;
// }

// // Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//   Student.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: new ObjectId(studentId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(studentId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  // async getUsers(req, res) {
  //   try {
  //     const users = await User.find();

  //     const userObj = {
  //       users
  //     };

  //     res.json(userObj);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   }
  // },

  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No student with that ID' })
      }

      res.json({
        user
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

    //   const course = await Course.findOneAndUpdate(
    //     { students: req.params.studentId },
    //     { $pull: { students: req.params.studentId } },
    //     { new: true }
    //);

    //   if (!course) {
    //     return res.status(404).json({
    //       message: 'Student deleted, but no courses found',
    //     });
    //   }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
