// 59921010B92BC980C78B0E342DF0E17F
var Steam = require('steam-webapi');
Steam.key = '59921010B92BC980C78B0E342DF0E17F';
// var user = new SteamApi.User('59921010B92BC980C78B0E342DF0E17F');

// var steamGroup = require('steam-group');

// var group = steamGroup.fromName('OVJ4');

// group.getMembers(100, (err, result) => {
//     console.log(result)
// });

// user.GetUserGroupList('76561198117651738').then((result) => {
//     console.log(result);
// });


Steam.ready(function(err) {
    if (err) return console.log(err);
 
    var steam = new Steam();
 
    // Retrieve the steam ID from a steam username/communityID 
    steam.getPlayerItems({ steamid: '76561197968620915', success: 1 }, function(err, data) {
        console.log(data);
        // data -> { steamid: '76561197968620915', success: 1 } 
 
        // Get the Player's TF2 Backpack items 
        // data.gameid = Steam.TF2;
 
        // getPlayerItems requires { gameid, steamid } 
        // steam.getPlayerItems(data, function (err, data) {
        //     console.log(data);
        //     // data -> { status: 1, num_backpack_slots: 1100, items: [...], ...} 
 
        // });
    });
 
});
