## px2-loader

A px transform loader

## Installation

- npm：`npm install px2-loader --save-dev`
- yarn：`yarn add px2-loader -D`

## Usage

```javascript
{
    test: /\.(s[ac]ss|css)$/i,
    use: [
        /** other loader */
        {
            loader: 'px2-loader',
			options: {
                datum: 375, /** 参照值 */
                scale: 100, /** 缩放比例, 仅在{ outputUnit: 'rem' }时有效 */
                outputUnit: 'vw', /** 输出单位 */
                minPixelValue: 1, /** 最小转换值 */
                precision: 6, /** 转换精度 */
                ignore: 'ignore' /** 忽略标记 */
            }
        },
		/** other loader */
    ]
},
```

## Ignore

```css
/* input */
.className {
    width: 100px; /* ignore */
}
/* output */
.className {
    width: 100px;
}
```

```css
/* input */
.className {
    transform: translate3d(100px/* ignore */, 100px, 0)
}
/* output, when options is default */
.className {
    transform: translate3d(100px, 26.666666vw, 0)
}
```