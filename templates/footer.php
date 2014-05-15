<?php if(  function_exists('emn_show_theme')  ) emn_show_theme(__FILE__); ?>
<footer class="content-info" role="contentinfo">
  <div class="container">
    <?php dynamic_sidebar('sidebar-footer'); ?>
    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
  </div>
</footer>

<?php if( function_exists('is_dev_server') && is_dev_server() ): ?>
  <script src="//localhost:35729/livereload.js"></script>
<?php endif; ?>

<?php wp_footer(); ?>
