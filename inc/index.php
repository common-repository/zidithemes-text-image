<?php 

function zidithemes_text_image_block() {
	
	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
	
	// Scripts
	wp_register_script(
		'zidithemes-text-image-block-script', 
		plugins_url( 'js/block.js', __FILE__ ), 
		array( 'wp-blocks', 'wp-element', 'wp-i18n' ) 
	);

	// Styles
	wp_register_style(
		'zidithemes-text-image-block-editor-style', 
		plugins_url( 'css/editor.css', __FILE__ ), 
		array( 'wp-edit-blocks' ) 
	);
	wp_register_style(
		'zidithemes-text-image-block-frontend-style', 
		plugins_url( 'css/style.css', __FILE__ ), 
		array( 'wp-edit-blocks' ) 
	);

	
	
	register_block_type( 'zidithemes-text-image/block', array(
		'editor_script' 	=> 'zidithemes-text-image-block-script',
		'editor_style' 		=> 'zidithemes-text-image-block-editor-style',
		'style' 			=> 'zidithemes-text-image-block-frontend-style',
	) );



}


//  Editor assets.
add_action( 'init', 'zidithemes_text_image_block' );

?>