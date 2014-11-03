<?php if(  function_exists('emn_show_theme')  ) emn_show_theme(__FILE__); ?>
<?php the_content(); ?>
<?php wp_link_pages(array('before' => '<nav class="pagination">', 'after' => '</nav>')); ?>
