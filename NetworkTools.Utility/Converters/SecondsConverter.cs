using System;
using System.Collections.Generic;
using System.Text;

namespace NetworkTools.Utility.Converters
{
    public static class SecondsConverter
    {
        static readonly string[] TimeSuffixes = { "S", "M", "H","D"};

        public static string TimeSuffix(Int64 value, int decimalPlaces = 1)
        {
            if (value < 0) { return "-" + TimeSuffix(-value); }

            int i = 0;
            decimal dValue = (decimal)value;
            while (Math.Round(dValue, decimalPlaces) >= 60)
            {
                dValue /= 60;
                i++;
            }

            var retunrString = string.Format("{0:n" + decimalPlaces + "} {1}", dValue, TimeSuffixes[i]);
            return retunrString;
        }
    }
}
