
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  
  function navBar() {
     var x = document.getElementById("myTopnav");
     if (x.className === "topnav") {
       x.className += " responsive";
     } else {
       x.className = "topnav";
     }
  }
  //sticky navbar
  window.onscroll = function() {stickyNav()};
  
  var navbar = document.getElementById("myTopnav");
  var sticky = navbar.offsetTop;
  
  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function stickyNav() {
    if (window.pageYOffset >= sticky) {
      myTopnav.classList.add("sticky")
    } else {
      myTopnav.classList.remove("sticky");
    }
  }
  
  function functionAlert(msg, myYes) {
      var confirmBox = $("#confirm");
      confirmBox.find(".message").text(msg);
      confirmBox.find(".yes").unbind().click(function() {
         confirmBox.hide();
      });
      confirmBox.find(".yes").click(myYes);
      confirmBox.show();
   }


 
 function navBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
 }
 //sticky navbar
 window.onscroll = function() {stickyNav()};
 
 var navbar = document.getElementById("myTopnav");
 var sticky = navbar.offsetTop;
 
 // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
 function stickyNav() {
   if (window.pageYOffset >= sticky) {
     myTopnav.classList.add("sticky")
   } else {
     myTopnav.classList.remove("sticky");
   }
 }
 
 function functionAlert(msg, myYes) {
     var confirmBox = $("#confirm");
     confirmBox.find(".message").text(msg);
     confirmBox.find(".yes").unbind().click(function() {
        confirmBox.hide();
     });
     confirmBox.find(".yes").click(myYes);
     confirmBox.show();
  }
 
//FUNCTIONALITY FOR THE SPECIFIC TRIP
function toggleFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("more-button");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}

