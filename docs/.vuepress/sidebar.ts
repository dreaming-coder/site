export default function getSidebar() {
    return {
        '/md/java/': getSidebarForJava(),
        '/md/algorithm/': getSidebarForAlgorithm(),
        '/md/database/': getSidebarForDatabase(),
        '/md/web/': getSidebarForWeb(),
        '/md/spring/': getSideBarForSpring(),
        '/md/middleware/': getSideBarForMiddleware(),
        '/md/foundation/': getSidebarForFoundation(),
        '/md/tools/': getSidebarForTools(),
        '/md/about/': getSidebarForAbout(),
    }
}

function getSideBarForMiddleware(){
    return [
        {
            text: 'Mybatis',
            children:[
                '/md/middleware/mybatis/mybatis-getting-started',
                '/md/middleware/mybatis/mybatis-configuration',
                '/md/middleware/mybatis/mybatis-mapper',
                '/md/middleware/mybatis/mybatis-cache',
                '/md/middleware/mybatis/mybatis-generator',
            ]
        }
    ]
}

function getSideBarForSpring() {
    return [
        {
            text: 'Spring Framework (v5.3.x)',
            children: [
                '/md/spring/spring-composition',
                '/md/spring/spring-helloworld',
                '/md/spring/spring-ioc',
                '/md/spring/spring-aop',
                '/md/spring/spring-tx',
                '/md/spring/spring-mvc',
                '/md/spring/spring-mvc-java-config',
            ]
        },
        {
            text: 'SpringBoot (v2.7.x)',
            children: [
                '/md/spring/springboot/springboot-introduction',
                '/md/spring/springboot/springboot-hello-world',
                '/md/spring/springboot/springboot-autoconfigure',
                '/md/spring/springboot/springboot-test',
            ]
        }
    ]
}

function getSidebarForDatabase() {
    return [
        {
            // isGroup: true,
            text: '数据库基础和原理',
            // sidebarDepth: 0,
            children: []
        },
        {
            // isGroup: true,
            text: 'MySQL',
            // sidebarDepth: 0,
            children: [
                '/md/database/mysql/mysql-type',
                '/md/database/mysql/mysql-foundation',
                '/md/database/mysql/mysql-row-column',
                '/md/database/mysql/mysql-engine',
                '/md/database/mysql/mysql-index',
                '/md/database/mysql/mysql-performance',
                '/md/database/mysql/mysql-store',
                '/md/database/mysql/mysql-lock',
            ]
        }
    ]
}

function getSidebarForFoundation() {
    return [
        {
            // isGroup: true,
            text: '设计模式',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/foundation/design-pattern/overview',
                '/md/foundation/design-pattern/factory-method',
                '/md/foundation/design-pattern/abstract-factory',
                '/md/foundation/design-pattern/builder',
                '/md/foundation/design-pattern/prototype',
                '/md/foundation/design-pattern/singleton',
                '/md/foundation/design-pattern/adapter',
                '/md/foundation/design-pattern/bridge',
                '/md/foundation/design-pattern/composite',
                '/md/foundation/design-pattern/decorator',
                '/md/foundation/design-pattern/facade',
                '/md/foundation/design-pattern/flyweight',
                '/md/foundation/design-pattern/proxy',
                '/md/foundation/design-pattern/chain-of-responsibility',
                '/md/foundation/design-pattern/command',
                '/md/foundation/design-pattern/iterator',
                '/md/foundation/design-pattern/mediator',
                '/md/foundation/design-pattern/memento',
                '/md/foundation/design-pattern/observer',
                '/md/foundation/design-pattern/state',
                '/md/foundation/design-pattern/strategy',
                '/md/foundation/design-pattern/template-method',
                '/md/foundation/design-pattern/visitor',
            ]
        }
    ]
}

function getSidebarForAlgorithm() {
    return [
        {
            // isGroup: true,
            text: '数据结构基础',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/algorithm/data-structure/array',
                '/md/algorithm/data-structure/linkedlist',
                '/md/algorithm/data-structure/stack-and-queue',
                '/md/algorithm/data-structure/binary-tree',
                '/md/algorithm/data-structure/bst',
                '/md/algorithm/data-structure/avl',
                '/md/algorithm/data-structure/rbt',
                '/md/algorithm/data-structure/huffman',
                '/md/algorithm/data-structure/graph-basic',
                '/md/algorithm/data-structure/graph-bfs-dfs',
                '/md/algorithm/data-structure/graph-min-tree',
                '/md/algorithm/data-structure/graph-min-distance',
                '/md/algorithm/data-structure/graph-topo-sort',
                '/md/algorithm/data-structure/graph-aoe',
            ]
        },
        {
            // isGroup: true,
            text: '算法基础',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/algorithm/algorithm-divide-and-conquer',
                '/md/algorithm/algorithm-dp',
                '/md/algorithm/algorithm-greedy',
                '/md/algorithm/algorithm-tracking',
            ]
        },
        {
            // isGroup: true,
            text: '常见排序算法',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/algorithm/sort/sort-overview',
                '/md/algorithm/sort/bubble-sort',
                '/md/algorithm/sort/quick-sort',
                '/md/algorithm/sort/insertion-sort',
                '/md/algorithm/sort/shell-sort',
                '/md/algorithm/sort/selection-sort',
                '/md/algorithm/sort/heap-sort',
                '/md/algorithm/sort/merge-sort',
                '/md/algorithm/sort/count-sort',
                '/md/algorithm/sort/radix-sort',
                '/md/algorithm/sort/bucket-sort',
            ]
        },
    ]
}

function getSidebarForJava() {
    return [
        {
            // isGroup: true,
            text: 'Java 基础',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/java/jdk-install',
                '/md/java/java-basic',
                '/md/java/java-oop',
                '/md/java/java-generic',
                '/md/java/java-annotation',
                '/md/java/java-exception',
                '/md/java/java-spi',
                '/md/java/java-servlet',
            ],
        },
        {
            // isGroup: true,
            text: 'Java 8 特性',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/java/java8/java8-lambda',
                '/md/java/java8/java8-optional',
                '/md/java/java8/java8-default',
                '/md/java/java8/java8-type-use',
                '/md/java/java8/java8-repeatable',
            ],
        },
    ]
}

function getSidebarForTools() {
    return [
        {
            // isGroup: true,
            text: '开发工具',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/tools/developer/overview',
                '/md/tools/developer/git',
                '/md/tools/developer/maven',
            ]
        },
        {
            // isGroup: true,
            text: 'Linux',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/tools/linux/linux-start',
                '/md/tools/linux/shell-basic',
                '/md/tools/linux/centos7-firewall'
            ]
        },
        {
            // isGroup: true,
            text: 'Tomcat',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/tools/tomcat/tomcat-install'
            ]
        },
        {
            // isGroup: true,
            text: 'Nginx',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/tools/nginx/nginx-install',
                '/md/tools/nginx/nginx-start'
            ]
        }
    ]
}

function getSidebarForWeb() {
    return [
        {
            // isGroup: true,
            text: 'HTML',
            // collapsable: false, // 可选的, 默认值是 true,
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/web/html/html-structure',
                '/md/web/html/html-text',
                '/md/web/html/html-separation',
                '/md/web/html/html-organization',
                '/md/web/html/html-table',
                '/md/web/html/html-form-1',
                '/md/web/html/html-form-2',
                '/md/web/html/html-form-3',
                '/md/web/html/html-embed'
            ]
        },
        {
            // isGroup: true,
            text: 'CSS',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/web/css/css-foundation',
                '/md/web/css/css-box',
                '/md/web/css/css-text',
                '/md/web/css/css-dynamic',
                '/md/web/css/css-others',
                '/md/web/css/css-flex',
                '/md/web/css/css-grid',
            ]
        },
        {
            // isGroup: true,
            text: 'JavaScript',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/web/javascript/js-foundation',
                '/md/web/javascript/js-reference',
                '/md/web/javascript/js-oop',
                '/md/web/javascript/js-core',
                '/md/web/javascript/js-drag',
                '/md/web/javascript/js-ajax',
                {text: 'JavaScript - Axios', link: 'https://axios-http.com/zh/docs/intro/'},
                {text: 'JavaScript - ECMAScript 6 入门', link: 'https://es6.ruanyifeng.com/'},
                '/md/web/javascript/es-destructuring',
                '/md/web/javascript/es-arrow',
                '/md/web/javascript/es-promise',
                '/md/web/javascript/es-generator',
                '/md/web/javascript/es-async',
                '/md/web/javascript/es-module',
            ]
        },
    ]
}

function getSidebarForAbout() {
    return [
        {
            // isGroup: true,
            text: '关于',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/about/me',
            ]
        },
        {
            // isGroup: true,
            text: '关于 - 本文档的搭建',
            // sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                '/md/about/vuepress'
            ]
        },

    ]
}