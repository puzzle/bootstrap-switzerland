import { babel } from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import svgSprite from 'rollup-plugin-svg-sprite-deterministic'
import scss from 'rollup-plugin-scss'
import terser from '@rollup/plugin-terser';
import legacy from '@rollup/plugin-legacy'
import nodeResolve from '@rollup/plugin-node-resolve'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import commonjs from 'rollup-plugin-commonjs'

export default [
  // Bundle version
  {
    input: 'src/js/bootstrap-italia.entry.js',
    output: {
      file: 'dist/js/bootstrap-switzerland.bundle.min.js',
      format: 'umd',
      generatedCode: 'es2015',
      name: "bootstrap"
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      copy({
        targets: [
          { src: 'src/assets', dest: 'dist' },
          { src: 'src/fonts', dest: 'dist' },
        ],
      }),
      svgSprite({
        outputFolder: 'dist/svg',
      }),
      scss({
        output: 'dist/css/bootstrap-switzerland.min.css',
        outputStyle: 'compressed',
        sourceMap: true,
        watch: 'src/scss',
      }),
      nodeResolve(),
      commonjs(),
      injectProcessEnv({
        NODE_ENV: 'production',
      }),
      terser(),
    ],
  },
  // Non-bundled version
  {
    input: 'src/js/bootstrap-italia.entry.js',
    watch: false,
    output: {
      file: 'dist/js/bootstrap-switzerland.min.js',
      format: 'umd',
      generatedCode: 'es2015',
      name: "bootstrap",
      globals: {
        '@popperjs/core' : 'Popper',
        '@splidejs/splide' : 'Splide',
        'animejs/lib/anime.es.js' : 'anime',
        'video.js' : 'videojs'
      },
    },
    external: [
      '@popperjs/core',
      '@splidejs/splide',
      'animejs/lib/anime.es.js',
      'video.js'
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      copy({
        targets: [
          { src: 'src/assets', dest: 'dist' },
          { src: 'src/fonts', dest: 'dist' },
        ],
      }),
      svgSprite({
        outputFolder: 'dist/svg',
      }),
      scss({
        output: 'dist/css/bootstrap-switzerland.min.css',
        outputStyle: 'compressed',
        sourceMap: true,
        watch: 'src/scss',
      }),
      nodeResolve(),
      commonjs(),
      injectProcessEnv({
        NODE_ENV: 'production',
      }),
      terser(),
    ],
  },
  // ESM version
  {
    input: 'src/js/bootstrap-italia.esm.js',
    watch: false,
    output: [
      {
        format: 'es',
        exports: 'named',
        sourcemap: true,
        dir: 'dist',
        preserveModules: true
      },
    ],
    plugins: [
      commonjs(),
    ],
  },
  // Entry for documentation
  {
    input: 'docs/assets/src/js/docs-entry.js',
    output: {
      file: 'docs/assets/dist/js/docs.min.js',
      compact: true,
      format: 'iife',
    },
    context: "window",
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      legacy({
        './cover-animation.js': {
          initCoverAnimation: 'animation.initCoverAnimation',
        },
      }),
      scss({
        output: 'docs/assets/dist/css/docs.min.css',
        outputStyle: 'compressed',
        watch: 'docs/assets/src/scss',
      }),
      injectProcessEnv({
        NODE_ENV: 'production',
      }),
    ],
  }
]
