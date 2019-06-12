
let app = { 
    // les variables
    percentage: 50,
    dragging: false,
    question: document.querySelector('.question'),
    sliderContainer: document.querySelector('.slider-container'),
    progressBar: document.querySelector('.progress'),
    progressBarZero: document.querySelector('.progress-zero'),
    thumbContainer: document.querySelector('.thumb-container'),
    thumb: document.querySelector('.thumb'),
    smileyFace: document.querySelector('.smiley-face'),
    sliderContainerWidth: document.querySelector('.slider-container').offsetWidth,
    sliderContainerLeft: document.querySelector('.slider-container').offsetLeft,
    translate: null,

    init: function () { // initialisation du script
        console.log('init');

        app.setPercentage();
        app.thumb.classList.add('contour');
        window.addEventListener('resize', app.handleReloadOnResize);
        document.addEventListener('mousemove', app.handleThumbMove);
        document.addEventListener('mouseup', app.handleThumbStop);
        app.thumb.addEventListener('mouseover', app.pickabooSmileyShow);
        app.thumb.addEventListener('mouseout', app.pickabooSmileyHide);
        app.thumb.addEventListener('mousedown', app.handleDragging);
        app.smileyFace.classList.add('neutral');
    },

    handleDragging: function () { // ça draggue ou pas?
        app.dragging = true;
    },

    pickabooSmileyShow: function() { // met le smiley au-dessus du curseur si la souris survole ce dernier
        app.question.style.opacity = 0.15;
        app.smileyFace.style.opacity = 1;
        app.smileyFace.style.transform = 'translate(-50%, -1.6vw)';
        app.thumb.classList.add('shadow-blur');
        app.thumb.classList.remove('contour');
    },

    pickabooSmileyHide: function() { // enlève le smiley du curseur si la souris quitte ce dernier
        app.question.style.opacity = 1;
        app.smileyFace.style.opacity = 0;
        app.smileyFace.style.transform = 'translate(-50%, 1.6vw)';
        app.thumb.classList.add('contour');
        app.thumb.classList.remove('shadow-blur');
    },

    handleThumbMove: function(event){

        if(app.dragging){
            app.pickabooSmileyShow(); //continuer d'afficher le smiley du thumb même lors du mouvement
            app.setPercentage(); // définir en temps réel le pourcentage
            
            if(event.clientX < app.sliderContainerLeft) {
                app.percentage = 0;
                //si le déplacement de la souris arrive au limite du container, le pourcentage est a zéro
                // permet de ne pas sortir des limite de la track
            }
            else if (event.clientX > app.sliderContainerWidth + app.sliderContainerLeft) {
                percentage = 100;
                // idem que ci dessus mais pour le pas sortir au delà de 100
            }
            else {
                app.translate = event.clientX - app.sliderContainerLeft;
                app.percentage = (app.translate / app.sliderContainerWidth) * 100;
                app.handleMood();
                // sinon dans la plage entre 0 et 100, promène toi comme tu veux, mais n'oublie pas de changer le smiley en fonction du pourcentage
            }
        }
    },

    handleMood: function() { // change le sourire du smiley en fonction du pourcentage courant
        if (app.percentage < 15) {
            app.smileyFace.classList.remove('fairly-unhappy');
            app.smileyFace.classList.add('unhappy');
        }
        else if (app.percentage >= 15 && app.percentage <= 40) {
            app.smileyFace.classList.remove('unhappy');
            app.smileyFace.classList.remove('neutral');
            app.smileyFace.classList.add('fairly-unhappy');
        }
        else if (app.percentage >= 40 && app.percentage <= 60) {
            app.smileyFace.classList.remove('fairly-unhappy');
            app.smileyFace.classList.remove('fairly-happy');
            app.smileyFace.classList.add('neutral');
        }
        else if (app.percentage >= 60 && app.percentage <= 85) {
            app.smileyFace.classList.remove('neutral');
            app.smileyFace.classList.remove('happy');
            app.smileyFace.classList.add('fairly-happy');
        }
        else if (app.percentage >= 85) {
            app.smileyFace.classList.remove('fairly-happy');
            app.smileyFace.classList.add('happy');
        }
    
    },

    handleThumbStop: function(){
        app.dragging = false;
        // permet de passer l'action de déplacement à false si on relache la souris
    },

    setPercentage: function() {
        
        
        if(app.percentage < 50){  
            app.progressBarZero.style.transform = 'scaleX(' + app.percentage/100 +')';
            app.progressBar.style.transform = 'scaleX(' + 0.5 +')';
            app.progressBarZero.style.background = '#ccc none repeat scroll 0% 0%'
            app.progressBar.classList.remove('green');
            app.progressBar.classList.add('red');
            // si le pourcentage descend en dessous de 50, la barre progresse reste bloqué en scale à 50% et la barre 
            //progressZero voit sont scale baisser pour laisser apparaitre la barre progress en dessous donnant l'illusion
            // d'un découvrement du centre vers la gauche
        }
        else if (app.percentage >= 50){ 
            app.progressBarZero.style.transform = 'scaleX(' + 0.5 +')';
            app.progressBar.style.transform = 'scaleX(' + app.percentage/100 +')';
            app.progressBarZero.style.background = '#ccc none repeat scroll 0% 0%'
            app.progressBar.classList.add('green');
            app.progressBar.classList.remove('red');
            // si le pourcentage est supérieur à 50, la barre progresse du dessous avance alors que 
            //la barre progressZero du dessus reste scalé à 50% et s'arrête au milieu
        }

        app.placeThumbContainer();
    },

    placeThumbContainer: function() { // placement du bouton de slider en position centrale
        app.thumbContainer.style.transform = 'translateX(' + (app.percentage/100 * app.sliderContainerWidth) + 'px) ';
    },

    handleReloadOnResize: function () { // lors du resize de la fenêtre, tout est rechargé pour que les éléments soient centré
        location.replace(location.href);
    },

}
document.addEventListener('DOMContentLoaded', app.init); // chargement d'init lorsque tous les élément de la page sont chargés

