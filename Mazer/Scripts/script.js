function GenerateImage()
{
    var image = new Image;
    var width = 400,
    height = 400,
    buffer = new Uint8ClampedArray(width * height * 4);

    for(var y = 0; y < height; y++)
    {
        for(var x = 0; x < width; x++)
        {
            var pos = (y * width + x) * 4; // position in buffer based on x and y
            buffer[pos  ] = Math.random()*255;           // some R value [0, 255]
            buffer[pos+1] = Math.random()*255;           // some G value
            buffer[pos+2] = Math.random()*255;           // some B value
            buffer[pos+3] = 255;           // set alpha channel
        }
    }
    

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    
    var idata = ctx.createImageData(width,height);
    idata.data.set(buffer);
    ctx.putImageData(idata, 0, 0); 
    var dataUri = canvas.toDataURL();  
    image.src = dataUri;
    
    

    try { document.getElementById('maze').remove(); }
    catch {}
    
    image.id = 'maze';
    document.body.insertBefore(image, document.getElementById('lower_line'));
}