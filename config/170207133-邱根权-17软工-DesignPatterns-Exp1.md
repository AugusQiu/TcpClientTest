# 《设计模式》实验指导书

- 姓名：邱根权
- 学号：170207133

## 实验一：观察者模式（3学时）

### 实验目的

- 理解观察者模式的基本概念
- 了解观察者模式和监听器的关系
- 掌握观察者模式的基本用法

### 实验工具

- 计算机，安装JDK
- Eclipse

### 实验题目

- 结合天气预报公告板的 `Observer` 例子，利用 `JavaBean` 事件机制，写一个简易的天气预报公告板

### 实验步骤

1. 阅读 `Observer` 程序代码；

2. 修改其继承关系，取消 `WeatherData` 继承于 `Subject` （即让`WeatherData`不是`Subject`的子类，下同理），取消 `CurrentConditionsDisplay` 等三个 `Display` 页面继承于 `Observer` ；

3. 修改 `WeatherData` 注册、注销、通知观察者的方法： `registerObserver(Observer o)` , `removeObserver(Observer o)` ,  `notifyObservers()` ，分别将其改为 `Bean` 事件中对应的方法： `addActionListener(ActionListener o)` , `removeActionListener(ActionListener o) ` , `processEvent(ActionEvent e)` ；

4. 修改 `WeatherData` 中 `processEvent()` 方法内对应的程序代码，使用 `actionPerformed()` 方法代替 `update()` 方法；

5. 修改 `WeatherData` 中 `measurementsChanged()` 方法，将其改为下述代码并思考原因：

   ````java
   public void measurementsChanged() {
       processEvent(new ActionEvent(this, ActionEvent.ACTION_PERFORMED, null));
   }
   ````

6. 修改 `CurrentConditionsDisplay` 和其他 `Display` 的构造函数中 `weatherData.registerObserver(this)` ，改为

   ```java
   weatherData.addActionListener(new ActionListener() {
       @Override
       public void actionPerformed(ActionEvent e) {
           //TODO Auto-generated method stub
       }
   });
   ```

7. 使用 `ActionListener` 中 `actionPerformed()` 方法实现监听事件的执行，并使用 `WeatherData wd = (WeatherData) e.getSource();` 获得传入的对象，进行进一步的操作，如数据显示等。


### 实验内容

- 源程序清单（每个类/接口一个代码块，要有必要注释，不必要之处可略）：

  ```java
  //WeatherStation.java，程序的main函数
  public class WeatherStation {
	public static void main(String[] args){
		WeatherData weatherData = new WeatherData();
		CurrentConditionsDisplay currentConditionsDisplay = new CurrentConditionsDisplay(weatherData);
		StatisticsDisplay        statisticsDisplay        = new StatisticsDisplay(weatherData);
		ForecastDisplay          forecastDisplay          = new ForecastDisplay(weatherData);
		weatherData.setMeasurements(82, 70, 29.2f);
		weatherData.setMeasurements(80, 75, 30.4f);
		weatherData.setMeasurements(78, 90, 29.2f);
	}
  }  

  //Weather.java
  public class WeatherData{

	private float temperature;
	private float humidity;
	private float pressure;

    /*向监听者对象发送信息*/
	private PropertyChangeSupport support = new PropertyChangeSupport(this);

	public WeatherData() {
		
	}

	public void addActionListener(PropertyChangeListener listener) {
         if(support == null){
         	support = new PropertyChangeSupport(this);
		 }
		 support.addPropertyChangeListener(listener);
	}

	public void removeActionListener(PropertyChangeListener listener){
		if(support==null){
			support=new PropertyChangeSupport(this);
		}
		support.removePropertyChangeListener(listener);
	}

	public void  processEvent(float oldValue,float newValue){
		support.firePropertyChange("temperature",oldValue,newValue);
	}

	public void setMeasurements(float temperature, float humidity, float pressure) {
        float oldTemperature = this.temperature;
		this.temperature = temperature;
		this.humidity = humidity;
		this.pressure = pressure;
		processEvent(oldTemperature,temperature);
	}


	public float getTemperature() {
		return temperature;
	}
	
	public float getHumidity() {
		return humidity;
	}
	
	public float getPressure() {
		return pressure;
	}
  }

  //CurrentConditionsDisplay.java
  public class CurrentConditionsDisplay {
	private float temperature;
	private float humidity;
	private WeatherData weatherData;

	public CurrentConditionsDisplay(WeatherData weatherData) {
		this.weatherData = weatherData;
		this.weatherData.addActionListener(new PropertyChangeListener() {
			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				WeatherData wd = (WeatherData)evt.getSource();
				update(wd.getTemperature(),wd.getHumidity(),wd.getPressure());
			}
		});
	}

	public void update(float temperature, float humidity, float pressure) {
		this.temperature = temperature;
		this.humidity = humidity;
		display();
	}
	
	public void display() {
		System.out.println("Current conditions: " + temperature 
			+ "F degrees and " + humidity + "% humidity");
	}
  }

  // ForecastDisplay.java
  public class ForecastDisplay{
	private float currentPressure = 29.92f;  
	private float lastPressure;
	private WeatherData weatherData;

	public ForecastDisplay(WeatherData weatherData) {
		this.weatherData = weatherData;
		this.weatherData.addActionListener(new PropertyChangeListener() {
			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				WeatherData wd = (WeatherData)evt.getSource();
				update(wd.getTemperature(),wd.getHumidity(),wd.getPressure());
			}
		});
	}

	public void update(float temp, float humidity, float pressure) {
        lastPressure = currentPressure;
		currentPressure = pressure;
		display();
	}

	public void display() {
		System.out.print("Forecast: ");
		if (currentPressure > lastPressure) {
			System.out.println("Improving weather on the way!");
		} else if (currentPressure == lastPressure) {
			System.out.println("More of the same");
		} else if (currentPressure < lastPressure) {
			System.out.println("Watch out for cooler, rainy weather");
		}
	}
  }

  //StatisticsDisplay
  public class StatisticsDisplay{
	private float maxTemp = 0.0f;
	private float minTemp = 200;
	private float tempSum= 0.0f;
	private int numReadings;
	private WeatherData weatherData;

	public StatisticsDisplay(WeatherData weatherData) {
		this.weatherData = weatherData;
		this.weatherData.addActionListener(new PropertyChangeListener() {
			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				WeatherData wd = (WeatherData)evt.getSource();
				update(wd.getTemperature(),wd.getHumidity(),wd.getPressure());
			}
		});
	}

	public void update(float temp, float humidity, float pressure) {
		tempSum += temp;
		numReadings++;
		if (temp > maxTemp) {
			maxTemp = temp;
		}
		if (temp < minTemp) {
			minTemp = temp;
		}
		display();
	}

	public void display() {
		System.out.println("Avg/Max/Min temperature = " + (tempSum / numReadings)
			+ "/" + maxTemp + "/" + minTemp);
	}
  }






  ```

 

- 运行结果：

  ```bash
  Current conditions: 82.0F degrees and 70.0% humidity
  Avg/Max/Min temperature = 82.0/82.0/82.0
  Forecast: Watch out for cooler, rainy weather
  Current conditions: 80.0F degrees and 75.0% humidity
  Avg/Max/Min temperature = 81.0/82.0/80.0
  Forecast: Improving weather on the way!
  Current conditions: 78.0F degrees and 90.0% humidity
  Avg/Max/Min temperature = 80.0/82.0/78.0
  Forecast: Watch out for cooler, rainy weather
  ```

### 实验总结
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;程序改写成javaBean的事件机制，就得用javabean的Bound属性。Bound属性表示当该种属性的值发生变化时，会自动触发PropertyChange事件，通知其他的对象该属性发生了变化。事件中封装了属性名、属性的原值、属性变化后的新值。在本程序中，也只有在重新设置属性，使得属性发生改变，才会触发display的打印函数



### 教师评语

