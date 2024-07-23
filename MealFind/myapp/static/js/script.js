function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  }



 
  document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('searchInput');
    const dropdownContent = document.getElementById('dropdownContent');
  
    const maxRecentSearches = 7;
    
    function loadRecentSearches() {
      const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      return searches;
    }
  
    function saveRecentSearches(searches) {
      localStorage.setItem('recentSearches', JSON.stringify(searches));
    }
  
 
    function updateDropdown() {
      const searches = loadRecentSearches();
      dropdownContent.innerHTML = searches.map(search => `<a href="#">${search}</a>`).join('');
    }
  
    function addRecentSearch(search) {
      let searches = loadRecentSearches();

      searches = searches.filter(s => s !== search);
  
      searches.unshift(search);

      if (searches.length > maxRecentSearches) {
        searches.pop();
      }
      saveRecentSearches(searches);
      updateDropdown();
    }
  

    inputField.addEventListener('focus', function() {
      updateDropdown();
      dropdownContent.classList.add('show');
    });
  

    inputField.addEventListener('blur', function() {
      setTimeout(() => {
        dropdownContent.classList.remove('show');
      }, 200); 
    });
  
  
    inputField.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        const search = inputField.value.trim();
        if (search) {
          addRecentSearch(search);
          inputField.value = '';
        }
      }
    });
  
 
    const toggleButton = document.querySelector('.dropbtn');
    toggleButton.addEventListener('click', function() {
      const dropdown = document.getElementById('myDropdown');
      dropdown.classList.toggle('show');
    });
  });
  

//Button login
document.querySelector("#show-login").addEventListener("click",function(){
  document.querySelector(".popup").classList.add("active");
});


document.querySelector(".popup .close-btn").addEventListener("click",function(){
  document.querySelector(".popup").classList.remove("active");
});


