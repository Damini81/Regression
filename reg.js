function developModel(){
  
    //Get input arrays
    var x_values = document.getElementById('x_values').value.split(",").map(Number);
    var y_values = document.getElementById('y_values').value.split(",").map(Number);
    
    //Get slope, intercept and R2 score
    var regressor = linearRegression(x_values, y_values);
  
    //Plot the chart
    plotRegressionChart(x_values, y_values, regressor['y_reg'], regressor['r2']);
    
  
    //Write the regression equation to the screen
    document.getElementById('regressionEquation').innerHTML = "<b>Regression Equation: </b> "+String(regressor['slope'])+"*x + "+String(regressor['intercept']);
    
  }
  
  function linearRegression(x_values, y_values){
          
    //Create the regressor object to store the equation's data
    var regressor = {};
    
    //we need to find the equation in the format y = m*x+b where m is the slope and b is the intercept
    var x_mean = x_values.reduce((a, b) => a + b, 0)/x_values.length;
    var y_mean = y_values.reduce((a, b) => a + b, 0)/y_values.length;
    
    //Equations for slope: 
    var slope = 0, slope_numerator = 0, slope_denominator = 0;
    for(i=0; i<x_values.length; i++){
      slope_numerator += (x_values[i]-x_mean)*(y_values[i]-y_mean);
      slope_denominator += Math.pow((x_values[i]-x_mean),2)
    }
    
    slope = slope_numerator/slope_denominator;
    console.log(slope);
    regressor['slope'] = slope;
    
    //Equation for intercept
    var intercept = y_mean - x_mean*slope;
    regressor['intercept'] = intercept;
  
    
    //predicting values of y based on x_values
    var y_reg = [];
    for(i=0; i<x_values.length; i++){
      console.log(x_values[i])
      y_reg.push(x_values[i]*regressor['slope']+regressor['intercept']);  //mx+c
    }
    regressor['y_reg'] = y_reg;
    
    
    //Now to find the r2 score
    var residual_sum_of_squares = 0, total_sum_of_squares = 0, r2 = 0;
    
    for(i=0; i<y_values.length; i++){
        residual_sum_of_squares+= Math.pow((y_reg[i]-y_values[i]),2);
        total_sum_of_squares += Math.pow((y_reg[i]-y_mean),2);
    }
    
    r2 = 1- residual_sum_of_squares/total_sum_of_squares;
    
    //Add to regressor object
    regressor['r2'] = r2;
    console.log(r2);
          
    return regressor;
          
  }
  
  
  function plotRegressionChart(x_values, y_values, y_reg, r2){
      ctx = document.getElementById('regressionChart');
      var mixedChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Line of Best Fit (r2: '+String(r2)+')',
                data: y_reg,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }, {
                type: 'scatter',
                label: 'True Values',
                data: y_values,
                backgroundColor: 'rgb(0, 0, 0)',
            }],
            labels: x_values
        }
    });
    
  }
  