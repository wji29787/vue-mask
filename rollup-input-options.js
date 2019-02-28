const babel= require('rollup-plugin-babel');
const nodeResolve= require('rollup-plugin-node-resolve');
// import nodeResolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
module.exports = {
    input:'./src/index.js',
    plugins: [
        nodeResolve(),
        // commonjs(),
        babel({
          exclude: 'node_modules/**' // 只编译我们的源代码
        })
      ]
}