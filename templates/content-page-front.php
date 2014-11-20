<?php if(  function_exists('emn_show_theme')  ) emn_show_theme(__FILE__); ?>
<?php while (have_posts()) : the_post(); ?>
  <?php the_content(); ?>
  <?php wp_link_pages(array('before' => '<nav class="pagination">', 'after' => '</nav>')); ?>
<?php endwhile; ?>
