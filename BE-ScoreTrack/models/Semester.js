export default (sequelize, DataTypes) => {
  const Semester = sequelize.define('Semester', {
   name: {
  type: DataTypes.STRING,
  allowNull: false
}
    ,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
  }, {
    timestamps: true,
    underscored: true 
  });
  return Semester;
};
