function Partition(arr, low, high)
{
    var pivot = FlattenColor(arr[Math.floor((low+high)/2)]), 
        i = low,
        j = high;

    while(i <= j)
    {
        while(FlattenColor(arr[i]) < pivot)
        {
            i++;
        }
        while(FlattenColor(arr[j]) > pivot)
        {
            j--;
        }
        if(i<=j)
        {
            Swap(arr, i, j)
            i++;
            j--;
        }
    }

    return i;
}

function QuickSort(arr, low, high)
{
    var index;

    if(arr.length > 1)
    {
        index = Partition(arr, low, high);
        if(low < index-1)
        {
            QuickSort(arr, low, index-1);
        }
        if(index < high)
        {
            QuickSort(arr, index, high);
        }
    }
    return arr
}

function FlattenColor(col)
{
    return 1000000*col[0] + 1000*col[1] + col[2];
}

function Unflatten(arr, n)
{
    var arr2 = []
    for(var i = 0; i < arr.length; i+=n)
    {
        var row = []
        for(var j = 0; j < n; j++)
        {
            row.push(arr[i+j]);
        }
        arr2.push(row);
    }
    return arr2;
}

function Flatten(arr) 
{
    var arr1 = []
    for (var i = 0; i < arr.length; i++)
    {
        arr1 = arr1.concat(arr[i]);
    }
    return arr1;
}

function Swap(arr, n1, n2)
{
    var temp = arr[n1];
    arr[n1] = arr[n2];
    arr[n2] = temp;
}

function SortImage()
{
    var data = Unflatten(GetImageData(), 4);
    var arr = QuickSort(data, 0, data.length-1);
    ImageFromArray(arr);
}

