# git操作的学习
## HEAD、master、branch总结
1. HEAD 是指向当前 commit 的引用，它具有唯一性，每个仓库中只有一个 HEAD。在每次提交时它都会自动向前移动到最新的 commit 。
2. branch 是一类引用。HEAD 除了直接指向 commit，也可以通过指向某个 branch 来间接指向 commit。当 HEAD 指向一个 branch 时， commit 发生时，HEAD 会带着它所指向的 branch 一起移动。
3. master 是 Git 中的默认 branch，它和其它 branch 的区别在于：
    - 新建的仓库中的第一个 commit 会被 master 自动指向；
    - 在 git clone 时，会自动 checkout 出 master。
4. 可以使用git log这个指令查看当前上述三个的指向。

## Git 的最基本的工作模型
### 简单说明
1. 从 GitHub 把中央仓库 clone 到本地（使用命令： git clone）
2. 把写完的代码提交（先用 git add 文件名 把文件添加到暂存区，再用 git commit交）
    - 在这个过程中，可以使用 git status 来随时查看工作目录的状态
    - 每个文件有 "changed / unstaged"（已修改）, "staged"（已修改并暂存）, "commited"（已提交） 三种状态，以及一种特殊状态"untracked"（未跟踪）
3. 提交一次或多次之后，把本地提交 push 到中央仓库（git push）
### 基本操作
1. git clone '仓库地址'
2. git add 文件名
3. git commit -m '介绍说明'
4. git push -u origin branch_name


## 多人合作的基本工作模型
### 简单说明
1. 多人从Github吧中央仓库clone到自己机器(本地)上（使用命令： git clone）
2. 同事 commit 代码到他的本地，并 push 到 GitHub 中央仓库
3. 你也可以把自己的 commit 代码到他的本地，并 push 到 GitHub 中央仓库
    - 如果你的同事比你先push到GitHub中央仓库，也就是说GitHub中央仓库有你本地仓库没有的commits,此时你需要先pull把远端仓库上的新内容取回到本地和本地合并，然后再把合并后的本地仓库向远端仓库推送
    - 如果 push 失败，就用 pull 把本地仓库的提交和中央仓库的提交进行合并，然后再 push 一次
### 基本操作
1. 同事一：
    - git clone '仓库地址'

   同事二：
   - git clone '仓库地址'

   ...

2. 同事一：
    - git add 文件名
    - git commit -m '介绍说明'
    - git push -u origin branch_name

3. 自己：
    - git pull origin branch_name
    - git add 文件名
    - git commit -m '介绍说明'
    - git push -u origin branch_name

### 合并commits
主要用到的操作是merge
1. merge含义：指定一个 commit，把它合并到当前的 commit 来。
2. 使用场景：
    - HEAD 领先于目标 commit：
        如果 merge 时的目标 commit 和 HEAD 处的 commit 并不存在分叉，而是 HEAD 领先于目标 commit，那么 merge 就没必要再创建一个新的 commit 来进行合并操作，因为并没有什么需要合并的。在这种情况下， Git 什么也不会做，merge 是一个空操作。
    - HEAD 落后于 目标 commit——fast-forward：
        如果 HEAD 和目标 commit 依然是不存在分叉，但 HEAD 不是领先于目标 commit，而是落后于目标 commit，Git 会直接把 HEAD（以及它所指向的 branch，如果有的话）移动到目标 commit：git merge feature1
    - HEAD 与目标 commit(branch1)存在分叉：
        从目标 commit 和当前 commit （即 HEAD 所指向的 commit）分叉的位置起，把目标 commit 的路径上的所有 commit 的内容一并应用到当前 commit，然后自动生成一个新的 commit。git merge branch1

    
### 常见问题

1. push冲突
   
   - 场景描述：在团队开发过程中，多人并发工作，你的同事有可能先你push自己的commit到Github中央仓库，导致中央仓库得到了更新，这样使得中央仓库包含了自己本地仓库没有的内容，这时候你再push，push会被拒绝。
   - 解决方案：
   先用 pull 把远端仓库上的新内容取回到本地和本地合并，然后再把合并后的本地仓库向远端仓库推送。
   - 基本操作：
        1. git pull origin branch_name
        2. git add 文件名
        3. git commit -m '内容说明'
        4. git push -u origin branch_name


2. merge冲突

    - 场景描述：merge 在做合并的时候，是有一定的自动合并能力的：如果一个分支改了 A 文件，另一个分支改了 B 文件，那么合并后就是既改 A 也改 B，这个动作会自动完成；如果两个分支都改了同一个文件，但一个改的是第 1 行，另一个改的是第 2 行，那么合并后就是第 1 行和第 2 行都改，也是自动完成。但是，如果两个分支修改了同一部分内容，merge 的自动算法就搞不定了。这种情况 Git 称之为：冲突。
    - 解决方案：
        1. 解决掉冲突：当使用了git merge branch1时，git会把两个文件冲突的内容放在一起，并使用相关符号区分开来，然后需要的自行判断我们选择保留哪个分支上的修改或者再次自行修改内容，保存文件。
        2. 手动提交，按照正常的提交操作提交。
    - 基本操作:
        1. git merge branch1
        2. 修改冲突文件内容，保存文件
        3. git add 文件名
        4. git commit -m '内容说明'
        5. git push -u origin branch_name


## 基本指令
- git log 查看历史提交记录 键盘英文状态下按字母q，退出git log
- git status 随时查看工作目录的状态
- git clone '地址' 下拉到本地
- git add 文件名 把文件添加到暂存区
- git commit -m 'xxx' 提交
- git push -u origin brnach_name 提交到中央仓库
- git branch 查看所有分支
- git branch branch_name  创建分支branch_name
- git checkout branch_name 切换分支
- git checkout -b branch_name 创建分支并自动切换到该分支上
- git branch -d branch_name 删除分支(需要合并分支的指令)
- git brnach -D branch_name 删除分支(无需合并分支的指令)
- git merge branch_name 合并分支

