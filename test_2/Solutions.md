## Exercise 1

---

```
FUNCTION arrayMax(arr):
    SET currentMax to arr[0]
    FOR index = 1 to length(arr) - 1
        IF arr[index] > currentMax THEN
            SET currentMax to arr[index]
        ENDIF
    ENDFOR
    RETURN currentMax
END FUNCTION
```

## Exercise 2

---

```
FUNCTION arrayOrder(arr):
    FOR i = 0 to length(arr) - 2
        SET minValue to arr[i]
        SET minIndex to i
        FOR j = i + 1 to length(arr) - 1
            IF arr[j] < minValue THEN
            minValue = arr[j]
            minIndex = j
            ENDIF
        ENDFOR
        SET arr[minIndex] to arr[i]
        SET arr[i] to minValue
    ENDFOR
    RETURN arr
END FUNCTION
```

## Exercise 3

---
