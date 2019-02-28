module.exports = [
//     {
//     file: './dist/index-cjs.js',
//     format: 'cjs',
//     banner: '// welcome to imooc.com',
//     footer: '// powered by sam'
//   },
   {
    file: './dist/vuemask-es.js',
    format: 'es',
    banner: '// welcome to imooc.com',
    footer: '// powered by sam',
  },
//    {
//     file: './dist/index-amd.js',
//     format: 'amd',
//     banner: '// welcome to imooc.com',
//     footer: '// powered by sam',
//   }, 
  {
    file: './dist/vuemask.js',
    format: 'umd',
    exports:'named',
    name: 'VueMask', // 指定文件名称
    banner: '// welcome to imooc.com',
    footer: '// powered by sam',
  }]
  