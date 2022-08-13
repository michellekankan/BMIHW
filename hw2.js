const firebaseConfig = {
    apiKey: "AIzaSyAPFccL-PcxbdAcz_jDGxNXvwVuJi7hk80",
    authDomain: "project4-e0dd4.firebaseapp.com",
    projectId: "project4-e0dd4",
    storageBucket: "project4-e0dd4.appspot.com",
    messagingSenderId: "833365811067",
    appId: "1:833365811067:web:25f70be8d906543726e7de",
    measurementId: "G-4M26ZBQGMB"
     
};
firebase.initializeApp(firebaseConfig);
// var data = {
    
    
  
// };
//firebase.database().ref().set()

//dom
//var H = document.querySelector('#height').value/100; 為什麼不能寫這裡
//var W = document.querySelector('#weight').value; 為什麼不能寫這裡
var result = document.querySelector('#result');
var bt = document.querySelector('#bt');
var list = document.querySelector('#list')
var data = firebase.database().ref();
var icon = document.querySelector('#icon');
var comment = document.querySelector("#comment");
//var box1 = document.querySelector(".box1")


//Event
bt.addEventListener('click', function(e){
    var H = document.querySelector('#height').value;
    var W = document.querySelector('#weight').value;
    var bmi = W/(H*H/10000);
    if (H==="" || W==="") {
        alert('請填數字!')
    } else {
        icon.style.display = "block";
        bt.innerHTML = bmi.toFixed(2) + "<p>BMI</p>";
        if (bmi > 27) {
            var word = "肥胖"
            bt.style.border = "5px solid #FF1401";
            bt.style.color = "#FF1401";
            comment.style.color = "#FF1401";
            icon.style.background = "#FF1401";
            var colors = '#FF1401'

        } else if ( bmi <= 27, bmi >24 ) {
            var word = '過重';
            bt.style.border = "5px solid #FF982C";
            bt.style.color = "#FF982C";
            comment.style.color = "#FF982C"
            icon.style.background = "#FF982C"
            var colors = '#FF982C'
        } else if ( bmi <= 24, bmi > 18.5) {
            var word = '正常';
            bt.style.border = "5px solid #86D73E";
            bt.style.color = "#86D73E";
            comment.style.color = "#86D73E"
            icon.style.background = "#86D73E";
            var colors = '#86D73E'
        } else {
            var word = '過輕'
            bt.style.border = "5px solid #31BAF9";
            bt.style.color = "#31BAF9";
            comment.style.color = "#31BAF9"
            icon.style.background = "#31BAF9"
            var colors = '#31BAF9'
        }
        document.querySelector('#comment').innerHTML = word;
        bt.style.background = "#424242";
        
        var time = new Date();
        var currentDate = (time.getMonth()+1)+'/'+time.getDate()+'/'+time.getFullYear();
        ///time這種方法寫入firebase對嗎？
        data.push({box1: colors, comment: word, height: H, weight: W, bmi: bmi, time: currentDate});
        e.preventDefault()

    }
})

data.on('value', function(snapshot){
    var str = "";
    var data = [];
    snapshot.forEach(function(item){
        data.push(item.val());
        //console.log('data', data)
    });
    data.reverse();
    console.log(data)
    data.forEach(function(item){
        //console.log(item.val());
        // str += '<li>' + 
        // '<div class="box1">' +' ' +'</div>'+
        // '<span class="box4">' + item.val().comment + '</span>' + 
        // '<span class="box3">' + ' BMI ' + '</span>' + 
        // '<span class="box2">' + item.val().bmi.toFixed(2) +'</span>' + 
        // '<span class="box3">' + ' weight ' +'</span>'+ 
        // '<span class="box2">' + item.val().weight +'kg'+ '</span>' + 
        // '<span class="box3">' + ' height '+ '</span>' + 
        // '<span class="box2"> ' + item.val().height +'cm'+ '</span>' + ' '+ 
        // '<span class="box5">' + item.val().time + '</span>' + 
        // '</li>';
        str += '<tr>' + 
        '<td class="box1" style="background:'+item.box1+'"></td>'+
        '<td class="box6"></td>'+
        '<td class="box4">' + item.comment + '</td>' + 
        '<td class="box3">' + ' BMI ' + '</td>' + 
        '<td class="box2">' + item.bmi.toFixed(2) +'</td>' + 
        '<td class="box3">' + ' weight ' +'</td>'+ 
        '<td class="box2">' + item.weight +'kg'+ '</td>' + 
        '<td class="box3">' + ' height '+ '</td>' + 
        '<td class="box2"> ' + item.height +'cm'+ '</td>' + ' '+ 
        '<td class="box5">' + item.time + '</td>' + 
        '</tr>';
    })
    list.innerHTML = str;
});





