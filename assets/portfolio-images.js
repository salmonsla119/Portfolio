(function(){
  'use strict';
  var data=window.PORTFOLIO_DATA||{};
  var cards=document.querySelectorAll('#project-grid .project-card');
  (data.projects||[]).forEach(function(project,index){
    var card=cards[index];
    if(!card)return;
    if(project.featured)card.classList.add('featured');
    var firstDetailImage=(project.images||[])[0];
    var cover=project.image||(firstDetailImage&&firstDetailImage.src);
    if(!cover)return;
    var thumb=card.querySelector('.project-thumb');
    if(!thumb)return;
    thumb.style.backgroundImage='url("'+String(cover).replace(/"/g,'\\"')+'")';
    thumb.classList.add('has-image');
  });
})();
