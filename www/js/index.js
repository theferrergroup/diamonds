$(document).on("pageshow","#index",function(event,ui){

    $('#btAccept').click(function(){

        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    
    $('#btnTerminos').click(function(){
        modal();
    });
  
    
});

function modal(){
    //$('#modal') este es el div contenedor del modal");
    //var modal, armo la estructura del modal
    var modal = '<div class="modal-dialog modal-lg">';
        modal += '<div class="modal-content">';
        modal += '<div class="modal-header">';
        modal += '<button type="button" onclick="cerrarmodal()" class="close" data-dismiss="modal" aria-label="Cerrar"><span aria-hidden="true">×</span></button>';
        modal += '<h4 class="modal-title">Terms and Conditions</h4>';
        modal += '</div>';
        modal += '<div class="modal-plan">';
        modal += '<div class="overlay-wrapper">';
        modal += '<div class="overlay">';
        modal += '<i class="fa fa-refresh fa-spin"></i>';
        modal += '</div></div></div>';
        modal += '<div class="clearfix">&nbsp;</div>';
        modal += '<div style="clear:both;" class="modal-footer" align="center"></div>';
        modal += '</div>';
    
    //html le coloco el contenido al selector indicado, en este caso, yo estoy indicando que a #modal se le va a agregar todo lo que esta dentro del parentesis
    $('#modal').html(modal);
    //luego de que agregue la estructura a de la ventana a #content, le agrego al div .boxContent (q lo acabo de crear), el contenido que va a generar la funcion "ponerusuario(id,obj)"
    $('.modal-plan').append(buscarplan('.modal-plan'));
    //despus q ya cree toda la estructura, le indico q la ventana como tal va a aparecer deslizandose hacia abajo.
    $('#modal').show(); //modal();
    //$('.imgBox').slideDown('fast',function(){$('.label').show()});
}

function buscarplan(obj){
    var formulario = '<form class="editForm form" style="background-color:white;" id="edit"><div class="contentBox" style="background-color:white;" align="left">';
    formulario += '<div class="col-sm-20" align="center" style="background-color:white; width: 80%;">';
    
    formulario += '<textarea rows="10" cols="20" wrap="hard"  >'
    formulario += 'By using the Diamondappnow.com website and Diamond App on any mobile platform you are agreeing to be bound by the following terms and conditions ("Terms of Use").'

formulario += 'Basic Terms'

formulario += 'You must be 18 years or older to use this site.'
formulario += 'You may not post nude, partially nude, or sexually suggestive photos.'
formulario += 'You are responsible for any activity that occurs under your screen name.'
formulario += 'You are responsible for keeping your password secure.'
formulario += 'You must not abuse, harass, threaten, impersonate or intimidate other users.'
formulario += 'You may not use the Diamond services App or Website for any illegal or unauthorized purpose. International users agree to comply with all local laws regarding online conduct and acceptable content.'
formulario += 'You are solely responsible for your conduct and any data, text, information, screen names, graphics, photos, profiles, audio and video clips, links ("Content") that you submit, post, and display on the service.'
formulario += 'You must not modify, adapt or hack the website or Diamonds App in any way so as to falsely imply that it is associated with us.'
formulario += 'You must not access Diamondsappnow or Diamonds app private API by any other means other than the application or website itself.'
formulario += 'You must not crawl, scrape, or otherwise cache any content from the application or website including but not limited to user profiles and photos.'
formulario += 'You must not create or submit unwanted email or comments to any Diamonds members ("Spam").'
formulario += 'You must not use web URLs in your name without prior written consent from us.'
formulario += 'You must not transmit any worms or viruses or any code of a destructive nature.'
formulario += 'You must not, in the use of Diamonds, violate any laws in your jurisdiction (including but not limited to copyright laws).'
formulario += 'Violation of any of these agreements will result in the termination of your account. While Diamonds App prohibits such conduct and content on its site, you understand and agree that Diamonds cannot be responsible for the Content posted on its web site or application and you nonetheless may be exposed to such materials and that you use the Diamond service at your own risk.'
formulario += 'The percentage charge by any diamonds platform can be used or modified at any time and without previous consent of any client (diamond) or Finder'
formulario += 'Is complete prohibit the communications between any client (diamond), finder or any staff member at any time'
formulario += 'After the first contract with any client (diamond) the finder can not contact him/her at any time, if they wish to work together this could be done two years after the client (diamond) cancel the profile on every Diamonds Platform, failing to complete the time mention before give us the right to use the laws against the client or the finder or any person that once worked for/with a finder and was contacted through our platform'






formulario += 'General Conditions'

formulario += 'We reserve the right to modify or terminate the Diamondsappnow.com or Diamonds App service for any reason, without notice at any time.'
formulario += 'We reserve the right to alter these Terms of Use at any time. If the alterations constitute a material change to the Terms of Use, we will notify you via internet mail according to the preference expressed on your account. What constitutes a "material change" will be determined at our sole discretion, in good faith and using common sense and reasonable judgement.'
formulario += 'We reserve the right to refuse service to anyone for any reason at any time.'
formulario += 'We reserve the right to force forfeiture of any username that becomes inactive, violates trademark, or may mislead other users.'
formulario += 'We may, but have no obligation to, remove Content and accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, obscene or otherwise objectionable or violates any party´s intellectual property or these Terms of Use.'
formulario += 'We reserve the right to reclaim usernames on behalf of businesses or individuals that hold legal claim or trademark on those usernames.'
formulario += 'Proprietary Rights in Content on Diamonds App'

formulario += 'We do NOT claim ANY ownership rights in the text, files, images, photos, video, sounds, musical works, works of authorship, applications, or any other materials (collectively, "Content") that you post on or through the our Services. By displaying or publishing ("posting") any Content on or through our Services, you hereby grant to Diamonds a non-exclusive, fully paid and royalty-free, worldwide, limited license to use, modify, delete from, add to, publicly perform, publicly display, reproduce and translate such Content, including without limitation distributing part or all of the Site in any media formats through any media channels, except Content not shared publicly ("private") will not be distributed outside the Diamonds Services.'
formulario += 'Some of the Services are supported by advertising revenue and may display advertisements and promotions, and you hereby agree that Diamonds may place such advertising and promotions on the Services or on, about, or in conjunction with your Content. The manner, mode and extent of such advertising and promotions are subject to change without specific notice to you.'
formulario += 'You represent and warrant that: (i) you own the Content posted by you on or through the Diamonds Services or otherwise have the right to grant the license set forth in this section, (ii) the posting and use of your Content on or through the Diamonds Services does not violate the privacy rights, publicity rights, copyrights, contract rights, intellectual property rights or any other rights of any person, and (iii) the posting of your Content on the Site does not result in a breach of contract between you and a third party. You agree to pay for all royalties, fees, and any other monies owing any person by reason of Content you post on or through the Diamond Services.'
formulario += 'The Diamond Services contain Content of Diamonds ("Diamonds Content"). Diamonds Content is protected by copyright, trademark, patent, trade secret and other laws, and Diamonds owns and retains all rights in the Diamonds Content and the Diamonds Services. Diamonds hereby grants you a limited, revocable, non-sublicensable license to reproduce and display the Diamonds Content (excluding any software code) solely for your personal use in connection with viewing the Site and using the Diamonds App Services.'
formulario += 'The Diamonds Services contain Content of Users and other Diamonds licensors. Except as provided within this Agreement, you may not copy, modify, translate, publish, broadcast, transmit, distribute, perform, display, or sell any content appearing on or through the Diamonds Services.'
formulario += 'Diamonds performs technical functions necessary to offer the Diamonds Services, including but not limited to transcoding and/or reformatting Content to allow its use throughout the Diamond Services.'
formulario += 'Although the Site and other Diamond Services are normally available, there will be occasions when the Site or other Diamond Services will be interrupted for scheduled maintenance or upgrades, for emergency repairs, or due to failure of telecommunications links and equipment that are beyond the control of Diamonds. Also, although Diamonds will normally only delete Content that violates this Agreement, Diamonds reserves the right to delete any Content for any reason, without prior notice. Deleted content may be stored by Diamonds in order to comply with certain legal obligations and is not retrievable without a valid court order. Consequently, Diamonds encourages you to maintain your own backup of your Content. In other words, Diamonds is not a backup service. Diamonds will not be liable to you for any modification, suspension, or discontinuation of the Diamonds Services, or the loss of any Content.'

    formulario += '</textarea>';
    formulario += '</div>';

                

    $('.modal-footer').html('<button type="button" id="edit-info" onclick="cerrarmodal()" class="btn-diamond">Accept</button></div>');
    $('.modal-title').html('Terms and Conditions');
    $(obj).html(formulario);
}

function cerrarmodal(){
    $("#modal").hide();
}