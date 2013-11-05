angular.module('getLinesFromDaysAgo', []).filter('betweenDays', function() {
  return function(input, minDays, maxDays) {

    // Return false, if the feed hasn't been loaded yet
    if (typeof input === 'undefined') return false;

    // Create new date object
    var date = new Date();

    // return input.filter(function(line) {
    //   console.log(line);
    //   return (
    //     line.updatedAt < (date.setDate(date.getDate() - minDays)) &&
    //     line.updatedAt > (date.setDate(date.getDate() - maxDays))
    //   );
    // });

    return _.filter(input, function(obj) {

      var date = new Date(), date1, date2,
          updated_at = new Date(obj.updatedAt),
          updated_date = updated_at.getFullYear() + '-' + updated_at.getMonth() + '-' + updated_at.getDate();

      date.setDate(date.getDate() - minDays);
      date1 = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

      date = new Date();
      date.setDate(date.getDate() - maxDays);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date2 = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

      // console.log('------------------------------------');
      // console.log('Checing with params: ', minDays, maxDays);
      // console.log('Updated At: ' + updated_date);
      // console.log('Min date:   ' + date1);
      // console.log('Max date:   ' + date2);
      // console.log(updated_date + ' <= ' + date1+ ' - ' + (updated_date <= date1));
      // console.log(updated_date + ' > ' + date2+ ' - ' + (updated_date > date2));
      // console.log('------------------------------------');

      return (updated_date <= date1 && updated_date > date2);
    });
  };
});