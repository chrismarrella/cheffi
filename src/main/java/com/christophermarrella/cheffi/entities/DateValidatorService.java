package com.christophermarrella.cheffi.entities;

import com.christophermarrella.cheffi.entity_interfaces.DateValidator;

import java.util.Calendar;

public class DateValidatorService implements DateValidator {

    @Override
    public boolean dateIsValid(Integer year, Integer month, Integer day) {
        if (year % 4 == 0) {
            if (month == 2) {
                if (day > 29) {
                    return false;
                }
            }
        } else {
            if (month == 2) {
                if (day > 28) {
                    return false;
                }
            }
        }
        if (month == 4 || month == 6 || month == 9 || month == 11 ) {
            if (day > 30) {
                return false;
            }
        }

        Calendar itemExpDate = Calendar.getInstance();
        itemExpDate.set(Calendar.YEAR, year);
        itemExpDate.set(Calendar.MONTH, month - 1);
        itemExpDate.set(Calendar.DAY_OF_MONTH, day);

        return (itemExpDate.compareTo(Calendar.getInstance()) >= 0);
    }

}