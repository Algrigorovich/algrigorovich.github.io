( function ( $ ) {
	'use strict';

	$( document ).on( 'click', '.aibolit-media-select', function () {
		const field = $( this ).closest( '.aibolit-media-field' );
		const kind = field.data( 'kind' );
		const frame = wp.media( {
			title: kind === 'image' ? 'Выберите изображение' : 'Выберите документ',
			button: { text: 'Использовать' },
			library: kind === 'image' ? { type: 'image' } : undefined,
			multiple: false
		} );

		frame.on( 'select', function () {
			const attachment = frame.state().get( 'selection' ).first().toJSON();
			field.find( '.aibolit-media-id' ).val( attachment.id );
			field.find( '.aibolit-media-remove' ).prop( 'hidden', false );

			if ( kind === 'image' ) {
				const source = attachment.sizes && attachment.sizes.medium ? attachment.sizes.medium.url : attachment.url;
				field.find( '.aibolit-media-preview' ).html( $( '<img>', {
					src: source,
					alt: '',
					css: { display: 'block', maxWidth: '320px', height: 'auto' }
				} ) );
			} else {
				field.find( '.aibolit-media-name' ).text( attachment.filename );
			}
		} );

		frame.open();
	} );

	$( document ).on( 'click', '.aibolit-media-remove', function () {
		const field = $( this ).closest( '.aibolit-media-field' );
		field.find( '.aibolit-media-id' ).val( '' );
		field.find( '.aibolit-media-preview, .aibolit-media-name' ).empty();
		$( this ).prop( 'hidden', true );
	} );
}( jQuery ) );
