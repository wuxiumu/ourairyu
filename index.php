<?php

// 引入必需文件
require_once( './common/config/global.php' );
require_once( OC_APATH_CLS . 'class-project.php' );

// 项目对象
global $oc_project;

$oc_project = new CLS_Project();

// 重定向访问目录失败时转为 WordPress 模式
if ( !($oc_project->vdir_redirect( array_shift( CLS_Utils::pathname() ) )) ) {
  define( 'WP_USE_THEMES', true );
  require( './wp-blog-header.php' );
}

?>
