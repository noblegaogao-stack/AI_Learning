package com.example.springboot_learning.java21;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Java 21 新特性演示类
 * 包含虚拟线程、模式匹配、密封类等所有重要特性
 */
public class Java21FeaturesDemo {

    /**
     * 主方法，用于运行所有演示
     */
    public static void runAllDemos() {
        System.out.println("=== Java 21 新特性演示 ===");
        
        demoVirtualThreads();
        System.out.println();
        
        demoPatternMatching();
        System.out.println();
        
        demoSealedClasses();
        System.out.println();
        
        demoRecordClasses();
        System.out.println();
        
        demoTextBlocks();
        System.out.println();
        
        demoSwitchExpressions();
        System.out.println();
        
        demoSequencedCollections();
    }

    /**
     * 演示虚拟线程（Virtual Threads）
     * 虚拟线程是轻量级线程，由JVM管理，比传统线程更高效
     */
    private static void demoVirtualThreads() {
        System.out.println("1. 虚拟线程演示");
        
        // 方法1：使用虚拟线程执行任务
        Thread virtualThread = Thread.ofVirtual().start(() -> {
            System.out.println("  虚拟线程执行: " + Thread.currentThread());
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        // 方法2：使用虚拟线程执行器
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 5; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    System.out.println("  虚拟线程任务 " + taskId + ": " + Thread.currentThread());
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                });
            }
        } // 自动关闭执行器
        
        try {
            virtualThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    /**
     * 演示模式匹配（Pattern Matching）
     * 模式匹配可以更简洁地进行类型检查和转换
     */
    private static void demoPatternMatching() {
        System.out.println("2. 模式匹配演示");
        
        // 模式匹配 for switch
        Object obj = "Hello, Java 21!";
        String result = switch (obj) {
            case null -> "值为null";
            case Integer i -> "整数: " + i;
            case String s -> "字符串: " + s;
            case List<?> list -> "列表，大小: " + list.size();
            default -> "其他类型";
        };
        System.out.println("  switch 模式匹配结果: " + result);
        
        // 模式匹配 for instanceof
        Object value = 42;
        if (value instanceof Integer i) {
            System.out.println("  instanceof 模式匹配: " + i * 2);
        }
    }

    /**
     * 演示密封类（Sealed Classes）
     * 密封类限制了哪些类可以继承它
     */
    private static void demoSealedClasses() {
        System.out.println("3. 密封类演示");
        
        Shape shape1 = new Circle(5);
        Shape shape2 = new Rectangle(4, 6);
        
        System.out.println("  圆形面积: " + shape1.calculateArea());
        System.out.println("  矩形面积: " + shape2.calculateArea());
    }

    /**
     * 密封接口 Shape
     */
    sealed interface Shape permits Circle, Rectangle {
        double calculateArea();
    }

    /**
     * 密封接口的实现类：圆形
     */
    static final class Circle implements Shape {
        private final double radius;
        
        public Circle(double radius) {
            this.radius = radius;
        }
        
        @Override
        public double calculateArea() {
            return Math.PI * radius * radius;
        }
    }

    /**
     * 密封接口的实现类：矩形
     */
    static final class Rectangle implements Shape {
        private final double width;
        private final double height;
        
        public Rectangle(double width, double height) {
            this.width = width;
            this.height = height;
        }
        
        @Override
        public double calculateArea() {
            return width * height;
        }
    }

    /**
     * 演示记录类（Record Classes）
     * 记录类是不可变的数据类，自动生成equals、hashCode、toString等方法
     */
    private static void demoRecordClasses() {
        System.out.println("4. 记录类演示");
        
        // 创建记录类实例
        Person person = new Person("张三", 30, "zhangsan@example.com");
        System.out.println("  记录类实例: " + person);
        
        // 访问记录类的组件
        System.out.println("  姓名: " + person.name());
        System.out.println("  年龄: " + person.age());
        System.out.println("  邮箱: " + person.email());
        
        // 记录类的不可变性
        // person.age() = 31; // 编译错误，记录类的组件是不可变的
    }

    /**
     * 记录类：Person
     */
    record Person(String name, int age, String email) {
        // 可以添加自定义方法
        public boolean isAdult() {
            return age >= 18;
        }
        
        // 可以添加紧凑构造函数
        public Person {
            if (age < 0) {
                throw new IllegalArgumentException("年龄不能为负数");
            }
        }
    }

    /**
     * 演示文本块（Text Blocks）
     * 文本块支持多行字符串，更易读
     */
    private static void demoTextBlocks() {
        System.out.println("5. 文本块演示");
        
        // 使用文本块定义多行字符串
        String html = """
        <html>
            <body>
                <h1>Hello, Java 21!</h1>
                <p>这是一个使用文本块的示例</p>
            </body>
        </html>
        """;
        
        System.out.println("  HTML文本块:\n" + html);
        
        // 文本块中的表达式插值
        String name = "Java 21";
        String message = """
        欢迎使用 %s！
        这是一个演示文本块的示例。
        """.formatted(name);
        
        System.out.println("  带表达式的文本块:\n" + message);
    }

    /**
     * 演示switch表达式的改进
     * 包括箭头语法、yield关键字等
     */
    private static void demoSwitchExpressions() {
        System.out.println("6. switch表达式演示");
        
        int day = 3;
        String dayName = switch (day) {
            case 1 -> "星期一";
            case 2 -> "星期二";
            case 3 -> "星期三";
            case 4 -> "星期四";
            case 5 -> "星期五";
            case 6, 7 -> "周末";
            default -> throw new IllegalArgumentException("无效的天数: " + day);
        };
        
        System.out.println("  星期几: " + dayName);
        
        // 使用yield关键字
        int month = 2;
        int days = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> {
                yield 31;
            }
            case 4, 6, 9, 11 -> {
                yield 30;
            }
            case 2 -> {
                yield 28; // 简化处理，未考虑闰年
            }
            default -> throw new IllegalArgumentException("无效的月份: " + month);
        };
        
        System.out.println("  2月的天数: " + days);
    }

    /**
     * 演示有序集合（Sequenced Collections）
     * 包括reversed()、addFirst()、addLast()等方法
     */
    private static void demoSequencedCollections() {
        System.out.println("7. 有序集合演示");
        
        // 创建有序列表
        List<String> list = List.of("a", "b", "c", "d");
        
        // 获取反向视图
        List<String> reversedList = list.reversed();
        System.out.println("  原始列表: " + list);
        System.out.println("  反向列表: " + reversedList);
        
        // 使用LinkedList演示addFirst和addLast
        java.util.LinkedList<String> linkedList = new java.util.LinkedList<>();
        linkedList.addLast("first");
        linkedList.addLast("second");
        linkedList.addFirst("zero");
        System.out.println("  LinkedList: " + linkedList);
        System.out.println("  第一个元素: " + linkedList.getFirst());
        System.out.println("  最后一个元素: " + linkedList.getLast());
    }
}
