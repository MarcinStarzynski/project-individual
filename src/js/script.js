const button = document.querySelector('.hide-button');
const menu = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay-wrapper');
const header = document.querySelector('.header');
const sidebar = document.querySelector('.sidebar');
const hWrapper = document.querySelector('.header-wrapper');
const slider = document.querySelector('#hour-slider');
const sliderInput = document.querySelector('#hour-input');
const menuButtons = document.querySelectorAll('.menu-button');
const sections = document.querySelectorAll('section.wrapper');
const popUps = document.querySelectorAll('.pop-up');
const popUpsTriggers = document.querySelectorAll('.pop-up-trigger');
let width = window.innerWidth;
const resize = function(){
  window.addEventListener('resize', function(){
    width = window.innerWidth;
    headerDisplay();
  });
  return width;
};

const sliderFunction = function(){
  let sliderValue = slider.value + ' hours';
  sliderInput.innerHTML = sliderValue;
  slider.addEventListener('change', function(){

    sliderValue = slider.value + ' hours';
    sliderInput.innerHTML = sliderValue;
  });
};

const menuHide = function(){

  button.addEventListener('click', function(event){
    event.preventDefault();
    menu.classList.toggle('hidden');
    button.classList.toggle('button-hidden');
    if(width <= 800 && !button.classList.contains('button-hidden')){
      overlay.classList.add('overlay');
    }else{
      overlay.classList.remove('overlay');
    }
  });
};

const pagesDisplay = function(){


  for(let button of menuButtons){
    button.addEventListener('click', function(event){
      event.preventDefault();
      const buttonHref = button.getAttribute('href');
      const sectionAddress = buttonHref.replace('#', '');
      for(let section of sections){
        const sectionId = section.getAttribute('id');
        if(sectionId == sectionAddress){
          section.classList.remove('hidden');
        }else{
          section.classList.add('hidden');
        }
      }
    });
  }
};

const headerDisplay = function(){
  if(width <= 600){
    sidebar.appendChild(header);
  }else{
    hWrapper.appendChild(header);
    header.classList.add('active');
  }

};

const popUpsShow = function() {

  console.log(popUps, popUpsTriggers);

  for(let trigger of popUpsTriggers){
    trigger.addEventListener('click', function(event){
      event.preventDefault();
      const triggerHref = trigger.getAttribute('data-href');
      const popUpId = triggerHref.replace('#', '');
      console.log(popUpId);
      for(let popUp of popUps){
        const popUpWrapperId = popUp.getAttribute('id');
        if(popUpWrapperId == popUpId){
          console.log('działa');
          popUp.classList.toggle('active');
          overlay.classList.add('overlay');
        }
        overlay.addEventListener('click', function(){
          if(popUp.classList.contains('active')){
            popUp.classList.remove('active');
          }
        });
      }
    });
  }
};

const overlayHide = function() {
  overlay.addEventListener('click', function(){
    if(overlay.classList.contains('overlay')){
      overlay.classList.remove('overlay');
    }
    if (!sidebar.classList.contains('hidden')){
      sidebar.classList.add('hidden');
      button.classList.add('button-hidden');
    }
  });
};

resize();
pagesDisplay();
menuHide();
headerDisplay();
sliderFunction();
overlayHide();
popUpsShow();

