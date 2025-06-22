export default (sequelize, DataTypes) => {
  const CourseCategory = sequelize.define('CourseCategory', {
  name: {
  type: DataTypes.STRING,
  allowNull: false
}

  } ,{
    timestamps: true,
    underscored: true 
  });
    return CourseCategory;
};
