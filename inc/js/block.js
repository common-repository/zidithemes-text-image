( function( editor, components, i18n, element ) {
	var el 					= element.createElement;
	var registerBlockType 	= wp.blocks.registerBlockType;
	var RichText 			= wp.editor.RichText;
	var BlockControls 		= wp.editor.BlockControls;
	var InspectorControls 	= wp.editor.InspectorControls;
	var ColorPalette 		= wp.components.ColorPalette;
	var MediaUpload 		= wp.editor.MediaUpload;
	var AlignmentToolbar 	= wp.editor.AlignmentToolbar;
	var SelectControl 		= wp.components.SelectControl;
	var RangeControl 		= wp.components.RangeControl;

	registerBlockType( 'zidithemes/text-img-block', { // The name of our block. 
		title: i18n.__( 'Zidithemes Text Image' ),
		description: i18n.__( 'Image and Text Gutenberg Block'), // The description of our block.
		icon: 'media-spreadsheet', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			textColor: {
				type: 'string',
				default: 'white',
			},
			zdbgColor: {
				type: 'string',
			},
			moveItem: {
				type: 'number',
				default: 1,
			},
			mgLeft: {
				type: 'range',
			},
			contenttitle: {
				type: 'string',
			},
			contentpara: {
				type: 'string',
			},
			alignment: {
				type: 'string',
				default: 'left',
			},
			contentHeight: {
				type: 'range',

			}
		},

		edit: function( props ) {

			var attributes 		= props.attributes;
			var contenttitle 	= props.attributes.contenttitle;
			var contentpara 	= props.attributes.contentpara;
			var contentheight 	= props.attributes.contentHeight;
			var alignment 		= props.attributes.alignment;
			var textColor 		= props.attributes.textColor;
			var zdbgColor 		= props.attributes.zdbgColor;
			var moveItem		= props.attributes.moveItem;
			var mgLeft			= props.attributes.mgLeft;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}


			return [

				//BEGIN INSPECTOR CONTROLS
				// Display the block options in the inspector panel.
				el( InspectorControls, { key: 'inspector' }, 

					el( components.PanelBody, 
						{
							title: i18n.__('Zidithemes Text Image Settings'),
							className: 'block-text-image-settings',
							initialOpen: false,
						},

						el( SelectControl, {
							label: i18n.__( 'Move Image Wrap' ),
							value: moveItem,
							options: [ 
            							{ label: 'Left', value: 1 },
							            { label: 'Right', value: 2 },
	                        		 ],
							onChange: function( newmoveItem ) {
								props.setAttributes( { moveItem: newmoveItem } );
							},
						} ),

						el( RangeControl, {
							beforeIcon: 'arrow-left-alt2',
							afterIcon: 'arrow-right-alt2',
							label: i18n.__( 'Margin Left Text Wrap' ),
							initialPosition: 0,
							value: mgLeft,
							onChange: function( newmgLeft ) {
								props.setAttributes( { mgLeft: newmgLeft } );
							},
							min: -30,
							max: 70,
						} ),

					),
					//BEGIN TEXT IMAG COLOR
					el( components.PanelBody, 
						{
							title: i18n.__('Zidithemes Text Image Color'),
							className: 'block-font-size',
							initialOpen: false,
						},

						el( 'p', {}, i18n.__( 'Background Color' ) ),
						el( ColorPalette, {
							label: i18n.__( 'Background Color' ),
							colors: [ 
								        { name: 'light-dark', color: '#353439'},
								        { name: 'light-blue', color: '#0ea5d3'} 
	                        		 ],
							value: zdbgColor,
							onChange: function( newzdbgColor ) {
								props.setAttributes( { zdbgColor: newzdbgColor } );
							},
						} ),

						el( 'p', {}, i18n.__( 'Text Color' ) ),
						el( ColorPalette, {
							label: i18n.__( 'Text Color' ),
							colors: [ 
								        { name: 'white', color: '#fff'} 
	                        		 ],
							value: textColor,
							onChange: function( newtextColor ) {
								props.setAttributes( { textColor: newtextColor } );
							},
						} ),

					),

				),
				//END INSPECTOR CONTROLS
				//BEGIN BLOCK CONTROLS
				el( BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
					el( 'div', { className: 'components-toolbar' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							render: function( obj ) {
								return el( components.Button, {
									className: 'components-icon-button components-toolbar__control',
									onClick: obj.open
									},
									el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
										el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
									)
								);
							}
						} )
					),

					el( AlignmentToolbar, {
						value: alignment,
						onChange: onChangeAlignment,
					} )
					
				),
				//END BLOCK CONTROLS

			//BEGIN EDITOR STYLING
			el( 'div', 
					{ 
						className: props.className,
						//style: { backgroundColor : colorButton }
			 		},

			 		el( 'div', 
			 				{ 
			 					className: 'zidithemes-mg wid-100 mb-wid-100' 
			 				}, 

			 				el( 'div', 
					 				{ 
					 					className: 'dsply-fl fl-wrap' 
					 				}, 

					 				el( 'div', 
					 				{ 
					 					className: 'grid-wrap wid-100 mb-wid-100',
					 					style: { backgroundColor: zdbgColor },
					 				}, 
					 					el( 'div', 
						 				{ 
						 					className: 'grid-items',
						 					style: { gridColumn: moveItem + '/' + 2 }, 
						 				},
							 				el( 'div', {
													className: attributes.mediaID ? 'img-wrap image-active' : 'img-wrap image-inactive',
													//style: { backgroundColor : colorCardButton}
												},
													el( MediaUpload, {
														onSelect: onSelectImage,
														type: 'image',
														value: attributes.mediaID,
														render: function( obj ) {
															return el( components.Button, {
																className: attributes.mediaID ? 'image-button auth-img' : 'button button-large',
																onClick: obj.open
																},
																! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
															);
														}
													} ),
											),
										),
										//END IMAGE
										el( 'div', 
						 				{ 
						 					className: 'grid-items' 
						 				},
											el( 'div', 
								 				{ 
								 					className: 'text-wrap',
								 					style: { color: textColor, marginLeft: mgLeft }  
								 				},
								 				el( 'div', {
													className: '', 
													style: { textAlign: alignment  } 
												},
													el( RichText, {
														tagName: 'h2',
														style: { color: textColor + '!important' },
														placeholder: 'Title Here',
														keepPlaceholderOnFocus: true,
														value: attributes.contenttitle,
														isSelected: false,
														onChange: function( newHeaderTitle ) {
															props.setAttributes( { contenttitle: newHeaderTitle } );
														},
													} ),
													
												),
												el( 'div', {
													className: '', 
													style: { textAlign: alignment } 
												},
													el( RichText, {
														tagName: 'p',
														style: { color: textColor + '!important' },
														placeholder: 'Description Here',
														keepPlaceholderOnFocus: true,
														value: attributes.contentpara,
														isSelected: false,
														onChange: function( newContentPara ) {
															props.setAttributes( { contentpara: newContentPara } );
														},
													} ),
													
												),
						 					)
					 					)
					 					//END TEXT
									)
									

			 				)
			 		)

			 )
			//END EDITOR STYLING


			];

		},

		save: function( props ) {
			var attributes 		= props.attributes;
			var contenttitle 	= props.attributes.contenttitle;
			var contentpara 	= props.attributes.contentpara;
			var contentheight 	= props.attributes.contentHeight;
			var alignment 		= props.attributes.alignment;
			var textColor 		= props.attributes.textColor;
			var zdbgColor 		= props.attributes.zdbgColor;
			var moveItem		= props.attributes.moveItem;
			var mgLeft 			= props.attributes.mgLeft;

			//BEGIN FRONT END STYLING
			return (
				
				el( 'div', {
						className: props.className
					},

					el( 'div', {
						className: 'zidithemes-mg'
						},

						el( 'div', {
								className: 'dsply-fl'
							},

							el( 'div', {
									className: 'grid-wrap mb-wid-100',
									style: { backgroundColor: zdbgColor },
								},

								el( 'div', {
										className: 'grid-items',
										style: { gridColumn: moveItem + '/' + 2 },
									},

									el( 'div', {
												className: 'img-wrap'
											},
											el( 'img', {
												className: 'author-img',
												src: attributes.mediaURL
											} ),

									),
									//e

								),

								el( 'div', {
										className: 'grid-items'
									},

									el( 'div', {
											className: 'text-wrap',
											style: {textAlign: attributes.alignment, color: attributes.textColor, marginLeft: attributes.mgLeft }
											},

										el( 'h2', {
											className: 'content-title'
											},
											i18n.__( attributes.contenttitle )
										),
										//kd
										el( 'p', {
											className: 'content-para',
											style: { padding: 'none !important'  },
											},
											i18n.__( attributes.contentpara )
										),
									),	
								),

							),

						),


					),

				)

			);
			//END FRONT END STYLING
		},
		});

} )(
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);