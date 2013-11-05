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
          updated_at = new Date(obj.updatedAt);

      var updated_date_year = updated_at.getFullYear();
      var updated_date_month = updated_at.getMonth();
      var updated_date_date = updated_at.getDate();
      var updated_date = updated_date_year + '-' + (updated_date_month > 9 ? updated_date_month : '0'+updated_date_month) + '-' + (updated_date_date > 9 ? updated_date_date : '0'+updated_date_date);

      date.setDate(date.getDate() - minDays);
      var date1_year  = date.getFullYear()
      var date1_month = date.getMonth()
      var date1_date  = date.getDate()
      date1 = date1_year + '-' + (date1_month > 9 ? date1_month : '0'+date1_month) + '-' + (date1_date > 9 ? date1_date : '0'+date1_date);

      date = new Date();
      date.setDate(date.getDate() - maxDays);
      var date2_year  = date.getFullYear()
      var date2_month = date.getMonth()
      var date2_date  = date.getDate()
      date2 = date2_year + '-' + (date2_month > 9 ? date2_month : '0'+date2_month) + '-' + (date2_date > 9 ? date2_date : '0'+date2_date);

      if (maxDays) {
        // console.log('------------------------------------');
        // console.log('Checing with params: ', minDays, maxDays);
        // console.log('Updated At: ' + updated_date);
        // console.log('Min date:   ' + date1);
        // console.log('Max date:   ' + date2);
        // console.log(updated_date + ' <= ' + date1+ ' - ' + (updated_date <= date1));
        // console.log(updated_date + ' > ' + date2+ ' - ' + (updated_date > date2));
        return (updated_date <= date1 && updated_date > date2);
      } else {
        // console.log('------------------------------------');
        // console.log('Checing with params: ', minDays, maxDays);
        // console.log('Updated At: ' + updated_date);
        // console.log('Min date:   ' + date1);
        // console.log(updated_date + ' <= ' + date1+ ' - ' + (updated_date <= date1));
        return (updated_date <= date1);
      }
    });
  };
});