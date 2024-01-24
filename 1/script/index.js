// navigation
function moveNavLinks() {
    const nav = document.querySelector('.navbar');
    const brand = document.querySelector('.brand');
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove("show");
  
    if (window.innerWidth <= 768) {
      navLinks.remove();
      nav.insertAdjacentElement('afterend', navLinks);
    } else {
      navLinks.remove();
      brand.insertAdjacentElement('afterend', navLinks);
    }
}
function navbarfunc() {
    moveNavLinks()
    const hamburger = document.querySelector(".hamburger");  
    const navLinksONe = document.querySelector('.nav-links');
    hamburger.addEventListener("click", function() {
      navLinksONe.classList.toggle("show");
    });

  
    // Close the dropdown menu when a link is clicked
    navLinksONe.addEventListener("click", function(event) {
    if (event.target.tagName === "A") {
        navLinksONe.classList.remove("show");
    }
    });
}
document.addEventListener("DOMContentLoaded", navbarfunc());
window.addEventListener("resize", moveNavLinks);
  
  

// full view
function openModal(gridItem) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalDescription = document.getElementById('modal-description');
    const imgElement = gridItem.querySelector('img');
    const imgDescription = gridItem.querySelector('.img-description');
    modal.style.display = 'flex';
    modalImg.src = imgElement.src;
    // modalDescription.textContent = imgDescription.textContent;
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}