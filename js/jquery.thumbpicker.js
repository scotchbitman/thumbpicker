/**
 *	PLUG IN JQUERY
 *	thumbpicker
 *
 *	@author Alexandre BLIEUX
 *	@version 0.1
 */
(function($){
	$.fn.thumbpicker = function(args){
	
		// Config par défaut
		/*	- NOM DU FORMULAIRE D'ENVOI (ID ET CLASS EVENTUELLEMENT)
		 *	- NOMBRE LIMITE DE SELECTION
		 *	- ATTRIBUT NAME DES CHAMPS CACHES
		 *	- COULEUR DU CADRE
		 *	- COULEUR DU CADRE AU SURVOL
		 *	- ANIMATION DU CADRE AU SURVOL (OUI/NON)
		 *	- COULEUR DU MASQUE
		 *	- OPACITE DU MASQUE
		 *	- ICONE DE VALIDATION
		 *	- DEBORDEMENT DE L'IMAGE (OVERFLOW)
		 *	- DIMENSIONS DES MINIATURES
		 */
		var conf = {
			'form' : null,
			'limit' : null,
			'hiddenName' : null,
			'frameBorderColor' : null,
			'frameBorderColorHover' : null,
			'frameAnimHover' : true,
			'maskColor' : '#000',
			'maskOpacity' : 0.3,
			'validIcon' : 'img/accept-small.png',
			'thumbOverflow' : null,
			'thumbDimension': null
		};
		// Fusion des paramètres par défaut et des arguments.
		var params = $.extend(conf,args);
		var selected = new Array();
		
		/**
		 *	La methode select() ajoute la classe .frame-selected à l'élément e 
		 *	passé en paramètre si celui-ci n'en dispose pas déjà. Dans ce 
		 *	dernier cas cette même classe sera retirée à l'élément. L'ajout de 
		 *	la classe .frame-selected a pour effet d'ajouter un fond coloré à 
		 *	l'élément pour spécifier que celui-ci est selectionné.
		 *
		 *	@param e: Object
		 *		Objet sur lequel on a cliqué.
		 */
		function select(e,callback){
			if($(e).hasClass('frame-selected'))
			$(e).removeClass('frame-selected');
			else $(e).addClass('frame-selected');
			if(callback) return callback();
		}
		
		/**
		 *	La méthode check() va permettre de faire apparaître le masque de
		 *	sélection au dessus de la miniature si celui-ci n'est pas déjà
		 *	visible. Si tel est le cas cette même méthode va faire disparaître
		 *	le masque. (Rappel: par défaut une transition est appliquée).
		 *
		 *	@param e: Object
		 */
		function check(e){
			$(e).children().last().fadeToggle('fast');
		}
		
		/**
		 *	la méthode noSeletion() renvoie true si aucun élément n'est
		 *	sélectionné, ceci arrive si après une sélection l'utilisateur
		 *	déselectionne tout.
		 *
		 *	@return boolean
		 */
		function noSelection(){
			return selected.length == 0;
		}
		
		/**
		 *	La méthode storeSelection() permet de récupérer les attributs id
		 *	des images dont le conteneur est sélectionné et de stocker ceux-ci
		 *	dans la variable d'instance "selected" qui est un tableau.
		 */
		function storeSelection(callback){
			selected = new Array();
			$('.frame-selected').each(function(){
				selected.push($(this).children().attr('id'));
			});
			if(callback) return callback();
		}
		
		/**
		 *	La méthode add() va créer un champ caché qui sera ajouté au DOM dans
		 *	un formulaire. Le nom de ce champ est pré-defini et l'attribut value
		 *	de ce champ sera l'id de l'image, autrement dit l'id du fils de
		 *	l'élément sur lequel on a cliqué.
		 */
		function add(){
			if(conf.form){
				var form = null;
				var reg = /^#.+/;
				if(reg.test(conf.form)) form = $(conf.form);
				else form = $($('form[name='+conf.form+']')[0]);
				
				$.each(selected,function(idx,val){
					form.append(
						$('<input></input>')
						.attr('type','hidden')
						.attr('name','sel[]')
						.attr('value',val)
					);
				});
			}
		}
		
		/**
		 *	La méthode clear() permet de vider le formulaire d'envoi des champs
		 *	cachés contenant les id des images sélectionnées.
		 *
		 *	@param callback: function()
		 *		Fonction de rappel à éxécuter après l'éxécution de clear()
		 *
		 *	@return callback
		 */
		function clear(callback){
			if(conf.form)
			$("input[name='sel[]']").remove();
			if(callback) return callback();
		}
		
		/**
		 *	La méthode init() est appelée à l'instanciation de l'objet.
		 *	Elle ajoute les masques au DOM sur les images. Ces
		 *	masques permettent de créer l'effet de sélection sur les images.
		 *
		 *	@param e: Object
		 */
		function init(e){
			// Mise en place des masques.
			$(e).append(
				$('<div></div>')
				.addClass('mask')
				.append(
					$('<img></img>')
					.attr('src',conf.validIcon)
				)
			);
			
			$(e).wrap($('<div></div>').addClass('item-frame'));
		}
	
		/**
		 *	ACTIONS
		 */
		return this.each(function(){
		
			// Sélection d'un élément...
			$(this).on('click',function(){
				select(this,function(){
					storeSelection(function(){
						if(noSelection()) clear();
						else{
							if($("input[name='sel[]']").length == 0)
							add();
							else
							clear(function(){
								add();
							});
						}
					});
				});
				
				check(this);
			});
			
			// Méthode d'initialisation...
			init(this);
		});
	};
})(jQuery);