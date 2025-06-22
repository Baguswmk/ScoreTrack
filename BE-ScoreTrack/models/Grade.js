export default (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
  score: {
  type: DataTypes.INTEGER,
  allowNull: false,
  validate: {
    min: 0,
    max: 100
  }
},
  feedback: DataTypes.TEXT
  }, {
    timestamps: true,
    underscored: true 
  });

Grade.associate = (models) => {
  Grade.belongsTo(models.Student, { foreignKey: 'studentId' });
  Grade.belongsTo(models.Course, { foreignKey: 'courseId' });
  Grade.belongsTo(models.Semester, { foreignKey: 'semesterId' });
};
  return Grade;
};
