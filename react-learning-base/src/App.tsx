import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';

// 1. 基础组件和Props类型定义
// 定义Props接口
interface GreetingProps {
  name: string;
  age?: number; // 可选属性
  isActive: boolean;
}

// 基础组件
const Greeting: React.FC<GreetingProps> = ({ name, age = 18, isActive }) => {
  return (
    <div>
      <h3>1. 基础组件和Props类型定义</h3>
      <p>Hello, {name}! You are {age} years old.</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

// 2. useState Hook
const Counter: React.FC = () => {
  // 使用useState Hook，指定状态类型为number
  const [count, setCount] = useState<number>(0);
  
  return (
    <div>
      <h3>2. useState Hook</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
    </div>
  );
};

// 3. useEffect Hook
const DataFetcher: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // 使用useEffect Hook处理副作用
  useEffect(() => {
    // 模拟API请求
    const fetchData = async () => {
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(['Item 1', 'Item 2', 'Item 3']);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // 清理函数
    return () => {
      console.log('Component unmounted or dependencies changed');
    };
  }, []); // 空依赖数组表示只在组件挂载和卸载时执行
  
  return (
    <div>
      <h3>3. useEffect Hook</h3>
      {loading ? <p>Loading...</p> : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 4. useContext Hook
// 创建Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题提供者组件
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用Context的组件
const ThemeToggle: React.FC = () => {
  // 使用useContext Hook获取Context值
  const context = useContext(ThemeContext);
  
  // 类型守卫，确保context不为undefined
  if (!context) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }
  
  const { theme, toggleTheme } = context;
  
  return (
    <div>
      <h3>4. useContext Hook</h3>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// 5. 自定义Hook
// 自定义Hook用于管理表单输入
const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  return { value, onChange: handleChange };
};

const CustomHookDemo: React.FC = () => {
  // 使用自定义Hook
  const username = useInput('');
  const email = useInput('');
  
  return (
    <div>
      <h3>5. 自定义Hook</h3>
      <div>
        <label>Username:</label>
        <input type="text" {...username} />
        <p>Value: {username.value}</p>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...email} />
        <p>Value: {email.value}</p>
      </div>
    </div>
  );
};

// 6. 类型断言和类型守卫
interface Cat {
  type: 'cat';
  meow: () => void;
}

interface Dog {
  type: 'dog';
  bark: () => void;
}

type Animal = Cat | Dog;

const AnimalSound: React.FC<{ animal: Animal }> = ({ animal }) => {
  // 类型守卫函数
  const isCat = (animal: Animal): animal is Cat => {
    return animal.type === 'cat';
  };
  
  return (
    <div>
      <h3>6. 类型断言和类型守卫</h3>
      <p>Animal type: {animal.type}</p>
      {isCat(animal) ? (
        <p>Sound: Meow</p>
      ) : (
        <p>Sound: Bark</p>
      )}
    </div>
  );
};

// 7. 泛型组件
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// 泛型组件
const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <div>
      <h3>7. 泛型组件</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
};

// 8. 条件渲染
const ConditionalRendering: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  return (
    <div>
      <h3>8. 条件渲染</h3>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
      {isLoggedIn ? (
        <p>Welcome, user!</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

// 9. 列表渲染
interface User {
  id: number;
  name: string;
  email: string;
}

const ListRendering: React.FC = () => {
  const [users] = useState<User[]>([
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
    { id: 3, name: 'Bob', email: 'bob@example.com' }
  ]);
  
  return (
    <div>
      <h3>9. 列表渲染</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 10. 事件处理
const EventHandling: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  
  // 事件处理函数
  const handleClick = () => {
    setMessage('Button clicked!');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  
  return (
    <div>
      <h3>10. 事件处理</h3>
      <button onClick={handleClick}>Click me</button>
      <input type="text" onChange={handleInputChange} placeholder="Type something" />
      <p>Message: {message}</p>
    </div>
  );
};

// 11. 表单处理
interface LoginFormData {
  username: string;
  password: string;
}

const FormHandling: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  
  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  
  return (
    <div>
      <h3>11. 表单处理</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// 12. 错误边界
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>12. 错误边界</h3>
          <p>Something went wrong:</p>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const ErrorComponent: React.FC = () => {
  // 模拟错误
  if (Math.random() > 0.5) {
    throw new Error('Random error occurred!');
  }
  
  return (
    <div>
      <h3>12. 错误边界</h3>
      <p>No error occurred.</p>
    </div>
  );
};

// 13. 懒加载和代码分割
// 注意：在实际项目中，这会创建一个单独的代码块
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const LazyLoadingDemo: React.FC = () => {
  const [showLazy, setShowLazy] = useState<boolean>(false);
  
  return (
    <div>
      <h3>13. 懒加载和代码分割</h3>
      <button onClick={() => setShowLazy(true)}>Load Lazy Component</button>
      {showLazy && (
        <React.Suspense fallback={<p>Loading lazy component...</p>}>
          <LazyComponent />
        </React.Suspense>
      )}
    </div>
  );
};

// 主应用组件
const App: React.FC = () => {
  return (
    <div className="container">
      <h1>React TypeScript 学习项目</h1>
      <p>一个知识点一个demo，详细的注释讲解，让你了解所有的React用法</p>
      
      <div className="demo-section">
        <Greeting name="John" age={25} isActive={true} />
      </div>
      
      <div className="demo-section">
        <Counter />
      </div>
      
      <div className="demo-section">
        <DataFetcher />
      </div>
      
      <div className="demo-section">
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </div>
      
      <div className="demo-section">
        <CustomHookDemo />
      </div>
      
      <div className="demo-section">
        <AnimalSound animal={{ type: 'cat', meow: () => console.log('Meow') }} />
        <AnimalSound animal={{ type: 'dog', bark: () => console.log('Bark') }} />
      </div>
      
      <div className="demo-section">
        <List 
          items={[1, 2, 3, 4, 5]} 
          renderItem={(item) => <span>{item}</span>} 
        />
        <List 
          items={['apple', 'banana', 'cherry']} 
          renderItem={(item) => <span>{item}</span>} 
        />
      </div>
      
      <div className="demo-section">
        <ConditionalRendering />
      </div>
      
      <div className="demo-section">
        <ListRendering />
      </div>
      
      <div className="demo-section">
        <EventHandling />
      </div>
      
      <div className="demo-section">
        <FormHandling />
      </div>
      
      <div className="demo-section">
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      </div>
      
      <div className="demo-section">
        <LazyLoadingDemo />
      </div>
    </div>
  );
};

export default App;