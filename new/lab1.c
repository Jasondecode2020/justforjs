/**
 * \file
 *         A very simple Contiki application showing how Contiki programs look
 * \author
 *         mds
 */

#include "contiki.h"
#include <stdio.h> /* For printf() */
#include "dev/leds.h"
#include "ieee-addr.h"
#include <string.h>
#include "dev/serial-line.h"
#include "dev/cc26xx-uart.h"
#include "buzzer.h"
#include "sys/ctimer.h"

/*---------------------------------------------------------------------------
define the global symbols for easily change
---------------------------------------------------------------------------*/
#define BUTTON_ON 1
#define BUTTON_OFF 0
#define BUZZ_FREQUENCY 1000
#define BUZZ_COUNTER 0

/*---------------------------------------------------------------------------*/
PROCESS(lab1_process, "lab1 process");
AUTOSTART_PROCESSES(&lab1_process);
/*---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------
global variables for function access
---------------------------------------------------------------------------*/
char led_red_state = BUTTON_OFF; // init off
char led_green_state = BUTTON_OFF; // init off
char led_all_state = BUTTON_OFF; // init off
char buz_state = BUTTON_OFF; // init off
int buz_freq = BUZZ_FREQUENCY;	// init 1000
char buzz_counter = BUZZ_COUNTER; // init 0
static struct ctimer timer_buzz_ctimer; //Callback Timer
static struct ctimer timer_red_ctimer; //Callback Timer
static struct ctimer timer_green_ctimer; //Callback Timer
static struct ctimer timer_all_ctimer; //Callback Timer	

/*---------------------------------------------------------------------------
functions to realize the different demand of requirements
use call back to make the program running async without many processes
and multi-thread, the three different functions can run at the same time.
---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------
1 functions to realize led red on and off
---------------------------------------------------------------------------*/
void show_toggle_led_red() {
	ctimer_reset(&timer_red_ctimer);
	leds_toggle(LEDS_RED);		//Toggle RED LED
}

/*---------------------------------------------------------------------------
2 functions to realize led green on and off
---------------------------------------------------------------------------*/
void show_toggle_led_green() {
	ctimer_reset(&timer_green_ctimer);
	leds_toggle(LEDS_GREEN);		//Toggle GREEN LED
}

/*---------------------------------------------------------------------------
3 functions to realize led all on and off
---------------------------------------------------------------------------*/
void show_toggle_led_all() {
	ctimer_reset(&timer_all_ctimer);
	leds_toggle(LEDS_ALL);		//Toggle ALL LED
}

/*---------------------------------------------------------------------------
4 functions to realize the buzz on and off
---------------------------------------------------------------------------*/
void show_buzz_on_off() {
	if (buz_state == BUTTON_ON) {
		buzzer_stop();
		buz_state = BUTTON_OFF;
	} else {
		buzzer_start(buz_freq);
		buz_state = BUTTON_ON;
	}
}

/*---------------------------------------------------------------------------
5 functions to realize the buzz freq increase 50Hz per second, press 'i': increase 
50 Hz per seconds, after 5 seconds keep the beep until press b again
---------------------------------------------------------------------------*/
static void buzz_callback_inc_freq() {
	if (buz_state == BUTTON_ON && buzz_counter < 5) {
		buz_freq += 50;
		buzzer_start(buz_freq);
		ctimer_reset(&timer_buzz_ctimer);
		buzz_counter++;
	}
	if (buz_state == BUTTON_ON && buzz_counter == 5) {
		buz_freq = BUZZ_FREQUENCY;
	}
}
/*---------------------------------------------------------------------------
6 functions to realize the buzz freq increase 50Hz per second, press 'd': decrease 
50 Hz per seconds, after 5 seconds keep the beep until press b again
---------------------------------------------------------------------------*/
static void buzz_callback_dec_freq() {
	if (buz_state == BUTTON_ON && buzz_counter < 5) {
		buz_freq -= 50;
		buzzer_start(buz_freq);
		ctimer_reset(&timer_buzz_ctimer);
		buzz_counter++;
	}
	if (buz_state == BUTTON_ON && buzz_counter == 5) {
		buz_freq = BUZZ_FREQUENCY;
	}
}

/*---------------------------------------------------------------------------
7 functions to realize the printing of ieee address
---------------------------------------------------------------------------*/
void print_ieee_address() {
	uint8_t address[8]; // 64 bit to hex
	ieee_addr_cpy_to(address, 8);
	printf("IEEE 64 bit address: ");
	for (int i = 0; i < 8; i++) {
		if (i < 7) { // noral print for first 7 address
			if ((int)(address[i]) >= 16) {
			printf("%x:", address[i]);
			} else { 
				printf("0%x:", address[i]);
			}
		} else { // specail print without : for the 8th address
			if ((int)(address[i]) >= 16) {
			printf("%x", address[i]);
			} else {
				printf("0%x", address[i]);
			}
		}
		
	}
	printf("\n\r");
}

//lab1 Thread
PROCESS_THREAD(lab1_process, ev, data) {

  	PROCESS_BEGIN();	//Start of thread

	cc26xx_uart_set_input(serial_line_input_byte);	//Initalise UART in serial driver


	//Processing loop of thread
	while (1) {
		PROCESS_YIELD(); // run other threads
  		
		if (ev == serial_line_event_message) { // print first line
			printf("reveived line: %s\n\r", (char *)data);
		}
		if (strcmp(data, "a") == 0) { // start conditional input
			if (led_all_state == BUTTON_OFF) {
				led_all_state = BUTTON_ON;
				ctimer_set(&timer_all_ctimer, CLOCK_SECOND, show_toggle_led_all, NULL);
			} else {
				led_all_state = BUTTON_OFF;
				ctimer_stop(&timer_all_ctimer);
			}
			
		} else if (strcmp(data, "g") == 0) {
			if (led_green_state == BUTTON_OFF) {
				led_green_state = BUTTON_ON;
				ctimer_set(&timer_green_ctimer, CLOCK_SECOND, show_toggle_led_green, NULL);
			} else {
				led_green_state = BUTTON_OFF;
				ctimer_stop(&timer_green_ctimer);
			}
			
		} else if (strcmp(data, "r") == 0) {
			if (led_red_state == BUTTON_OFF) {
				led_red_state = BUTTON_ON;
				ctimer_set(&timer_red_ctimer, CLOCK_SECOND, show_toggle_led_red, NULL);
			} else {
				led_red_state = BUTTON_OFF;
				ctimer_stop(&timer_red_ctimer);
			}
		} else if (strcmp(data, "b") == 0) {
			show_buzz_on_off();
		} else if (strcmp(data, "i") == 0) {
			buzz_counter = 0;
			ctimer_set(&timer_buzz_ctimer, CLOCK_SECOND, buzz_callback_inc_freq, NULL);
		} else if (strcmp(data, "d") == 0) {
			buzz_counter = 0;
			ctimer_set(&timer_buzz_ctimer, CLOCK_SECOND, buzz_callback_dec_freq, NULL);
		} else if (strcmp(data, "n") == 0) {
			print_ieee_address();
		}
	}

  	PROCESS_END();		//End of thread
}
/*---------------------------------------------------------------------------*/
