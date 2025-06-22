export default (sequelize, DataTypes) => {
  const Mentor = sequelize.define('Mentor', {
   name: {
  type: DataTypes.STRING,
  allowNull: false
}

   }, {
    timestamps: true,
    underscored: true 
  });
  return Mentor;
};
