<?php
/**
 * Custom functions
 */


// remove ALL widgets
add_action( 'widgets_init', function()
{
    if ( empty ( $GLOBALS['wp_widget_factory'] ) )
        return;

    $GLOBALS['wp_widget_factory']->widgets = array();
}, 20);

