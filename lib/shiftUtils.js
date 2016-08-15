/**
 * These functions are responsible for manipulating a master list of shifts.
 */

function updateShiftIds(list){
  if (list.length === 0){
    return;
  }
  list.forEach(function(shift, index){
    shift.id = index;
  });
  return list;
};

function refineListByUser(list, user){
  var refined = list.filter(function(item){
    return list.owner === user.name.toLowerCase();
  });
  return refined;
}

function refineListByLocation(list, value){
  var refined = list.filter(function(item){
    return list.location === value.toUpperCase();
  });
  return refined;
}

function coverShiftById(list, shiftId){
  var shift = list[shiftId];
  list = list.splice(shiftId, 1);
  return shift;
}

module.exports = {
  updateShiftIds: updateShiftIds,
  coverShiftById: coverShiftById,
  refineListByUser: refineListByUser,
  refineListByLocation: refineListByLocation
}