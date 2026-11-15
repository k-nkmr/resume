# Resume

公開用の職務経歴書です。

- [Web版](https://k-nkmr.github.io/resume/)
- [Markdown版](index.md)

職務経歴はMarkdownで管理し、GitHub Pagesで公開しています。公開にあたり、顧客名・サービス名・機密情報は一般化しています。

## ローカルで確認する

依存パッケージをインストールします。

```bash
npm ci
```

Web版をプレビューします。

```bash
npm run preview
```

PDFを生成します。出力先は`index.pdf`です。

```bash
npm run build:pdf
```
