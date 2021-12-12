function GenerateRandomImage()
{
    var image = new Image;
    var width = 600,
    height = 400,
    buffer = new Uint8ClampedArray(width * height * 4);


    for(var y = 0; y < height; y++)
    {
        for(var x = 0; x < width; x++)
        {
            var pos = (y * width + x) * 4;
            buffer[pos] = Math.random()*255;  
            buffer[pos+1] = Math.random()*255;  
            buffer[pos+2] = Math.random()*255;
            buffer[pos+3] = 255;
        }
    }

    console.log(buffer);


    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    
    var idata = ctx.createImageData(width,height);
    idata.data.set(buffer);
    ctx.putImageData(idata, 0, 0); 
    var dataUri = canvas.toDataURL();  
    image.src = dataUri;

    try { document.getElementById('img').remove(); }
    catch {}
    
    image.id = 'img';
    image.width = 600;
    image.height = 400;
    document.body.insertBefore(image, document.getElementById('mid_line'));
}

function ImageFromArray(arr)
{
    var image = new Image;
    var width = 600,
    height = 400,
    buffer = new Uint8ClampedArray(width * height * 4);

    var permArr = []; //Stores order to iterate over sorted buffer. Configured to go from upper left to lower right

    for(var y = 0; y < height; y++)
    {
        for(var x = 0; x < width; x++)
        {
            permArr.push([Math.sqrt(x*x + y*y), y*width + x]);
        }
    }
    permArr.sort(SortFunction);
    console.log(permArr);

    for(var i = 0; i < arr.length; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            buffer[4*permArr[i][1] + j] = arr[i][j];
        }
    }

    console.log(buffer);
    

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    
    var idata = ctx.createImageData(width,height);
    idata.data.set(buffer);
    ctx.putImageData(idata, 0, 0); 
    var dataUri = canvas.toDataURL();  
    image.src = dataUri;

    try { document.getElementById('img_sort').remove(); }
    catch {}
    
    image.id = 'img_sort';
    image.width = 600;
    image.height = 400;
    document.body.insertBefore(image, document.getElementById('low_line'));
}

function GetImageData()
{
    var img = document.getElementById('img');
    var h = img.height, w = img.width;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, w, h);
    var data = imageData.data;
    return data
}

function SortFunction(a, b)
{
    if (a[0] === b[0])
    {
        return 0;
    }
    else
    {
        return (a[0] < b[0]) ? -1 : 1;
    }
}