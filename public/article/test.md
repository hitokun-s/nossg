クライアントサイドMVCを行う静的サイトの作成
====

###必要な機能###
- [markdown->html変換器](#abc)
- markdownとアプリケーション（html）の混在する記事を作成する仕組み
- 各記事URLはURLパスで識別する必要があるが、トップレベルにいるMVCマネージャとどう連携させるのか？  
  （MVCマネージャ：いろんなパーツを寄せあつめて最終的なページを作るjs）
- リンクは別窓で開く（ただしアンカー以外）

###決めごと###
- 各記事のURL形式

###調べごと###
- markdownでアンカーは実現できる？

### markdown->html変換器 ###

StackOverFlowで使われている、PageDownを使ってみる。  
[https://code.google.com/p/pagedown/wiki/PageDown](https://code.google.com/p/pagedown/wiki/PageDown)


### ページ内アンカーの実現方法#abc ###
mdのみでアンカーを実現できるmarkdownエンジンもあるらしいが、PageDownは未対応。  
md内に独自記法でアンカーを書かせて、html変換後にidに書き換えるようなjsハックが必要。  
それを考えると結局はhamlみたいに、idやclassを簡単に指定でき書式になるはず。  

参考：  
[http://treeapps.hatenablog.com/entry/2014/01/10/004735](http://treeapps.hatenablog.com/entry/2014/01/10/004735)  
[http://artroot.jp/article/201403181](http://artroot.jp/article/201403181) 

問題：  
静的MVCでは、titleやdescriptionなどSEOが全くできなくなる。  
やはり静的ファイルを作る仕組みは必要。 

解決策：  
Github Pagesプロジェクト自体を、webサーバ構成にしてしまう（php,NodeJSなど好きなもの）。  
で、テストを兼ねたローカル実行は必ずするはずなので、その際に静的ファイル化してしまう。  

欠点１：  
せっかくajaxMVCを頑張っても、それはローカル環境でしか活躍しないことになる。  
というかもう、ajaxMVCにしようという当初の目的が無意味になっている。

欠点２：  
開発環境依存になる。たとえば別PCで記事を更新しようと思ったら、  
プロジェクトをgithubから落としたあと、phpとかnodeJs環境を作って実行する必要がある。  

解決策：  
「html取得＆githubプッシュ」する常駐プログラムをどっかで走らせる。  
でも更新ページを教える方法が必要になる。  
github APIを利用して更新有無を判断できないものか？  

やっぱりnode-webkitで頑張るのが早いような。。。  
[http://blog.asial.co.jp/1305](http://blog.asial.co.jp/1305)  
よくわからないが、nodeJSモジュールはnode-webkitでも使えるのだろうか？  
=> できるっぽい。  
[http://efcl.info/2014/0430/res3872/](http://efcl.info/2014/0430/res3872/)  

node-webkitはgithubページread.me内のDownloadリンクから取得  
[https://github.com/rogerwang/node-webkit](https://github.com/rogerwang/node-webkit)  

超参考  
[http://blog.asial.co.jp/1305](http://blog.asial.co.jp/1305)  
[http://flatbird.github.io/2014/02/15/node-webkit/](http://flatbird.github.io/2014/02/15/node-webkit/)   




 

