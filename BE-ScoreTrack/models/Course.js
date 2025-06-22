export default (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
   name: {
  type: DataTypes.STRING,
  allowNull: false
}

  }, {
    timestamps: true,
    underscored: true 
  });

  Course.associate = (models) => {
    Course.belongsTo(models.Mentor, { foreignKey: 'mentorId' });
    Course.belongsTo(models.CourseCategory, { foreignKey: 'categoryId' });
  };

  return Course;
};
