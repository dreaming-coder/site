let navbar = [
    {
        text: '☕Java',
        link: '/md/java/jdk-install',
    },
    {
        text: '📚算法',
        children: [
            {
                text: '算法基础和思想',
                children: [
                    {
                        text: '数据结构基础',
                        link: '/md/algorithm/data-structure/array'
                    },
                    {
                        text: '算法基础',
                        link: '/md/algorithm/algorithm-divide-and-conquer'
                    },
                    {
                        text: '常见排序算法',
                        link: '/md/algorithm/sort/sort-overview'
                    },
                ]
            }
        ]
    },
    {
        text: '🔗数据库',
        children: [
            {
                text: '数据库基础和原理',
                link: '/'
            },
            {
                text: 'SQL 数据库',
                children: [
                    {
                        text: 'MySQL 详解',
                        link: '/md/database/mysql/mysql-type'
                    }
                ]
            }
        ]
    },
    {
        text: '💻前端',
        children: [
            {
                text: '前端基础',
                children: [
                    {
                        text: 'HTML',
                        link: '/md/web/html/html-structure'
                    },
                    {
                        text: 'CSS',
                        link: '/md/web/css/css-foundation'
                    },
                    {
                        text: 'JavaScript',
                        link: '/md/web/javascript/js-foundation'
                    },
                ]
            }
        ]
    },
    {
        text: '🍃Spring',
        children: [
            {
                text: 'Spring Framework (v5.3.x)',
                children: [
                    {
                        text: 'Spring 框架组成',
                        link: '/md/spring/spring-composition'
                    },
                    {
                        text: '控制反转 (IoC)',
                        link: '/md/spring/spring-ioc'
                    },
                    {
                        text: '面向切面编程 (AOP)',
                        link: '/md/spring/spring-aop'
                    },
                    {
                        text: 'Spring MVC',
                        link: '/md/spring/spring-mvc'
                    },
                ]
            },
            {
                text: 'SpringBoot (v)',
                children: [
                    {
                        text: 'SpringBoot 入门',
                        link: '/'
                    }
                ]
            }
        ]
    },
    {
        text: '📌框架|中间件',
        link: '/'
    },
    {
        text: '💊内功',
        children: [
            {
                text: '设计模式',
                link: '/md/foundation/design-pattern/overview'
            }
        ]
    },
    {
        text: '💯项目',
        link: '/' // /md/projects
    },
    {
        text: '🔧工具|部署',
        children: [
            {
                text: '开发工具',
                link: '/md/tools/developer/overview',
            },
            {
                text: 'Linux',
                link: '/md/tools/linux/linux-start',
            },
            {
                text: 'Tomcat',
                link: '/md/tools/tomcat/tomcat-install',
            },
            {
                text: 'Nginx',
                link: '/md/tools/nginx/nginx-install',
            },
            {
                text: 'Docker',
                link: '/md/tools/docker',
            },
        ]
    },
    {
        text: '🎮摸鱼时间',
        children: [
            {
                text: '俄罗斯方块',
                link: 'https://binaryify.github.io/vue-tetris/?lan=zh'
            },
            {
                text: '鱼塘热搜',
                link: 'https://mo.fish/'
            },
            {
                text: '迷宫生成器',
                link: 'http://www.mazegenerator.net/'
            },
            {
                text: '多摸鱼',
                link: 'https://duomoyu.com/'
            },
            {
                text: 'slither',
                link: 'http://slither.io/'
            },
            {
                text: '效率资讯',
                link: 'https://www.anyknew.com'
            },
            {
                text: 'ZType',
                link: 'https://www.anyknew.com'
            }, {
                text: 'Mikutap',
                link: 'https://aidn.jp/mikutap/'
            }, {
                text: '为所欲为',
                link: 'https://lab.bangbang93.com/wsyw'
            },
            {
                text: '文章生成器',
                link: 'https://suulnnka.github.io/BullshitGenerator/index.html'
            },
            {
                text: 'Nokia短信图片生成器',
                link: 'https://zzkia.noddl.me/'
            },
            {
                text: '数字尾巴',
                link: 'https://www.dgtle.com/'
            },
        ]
    },
    {
        text: '💣关于',
        link: '/md/about/me'
    }
];

export default navbar;
