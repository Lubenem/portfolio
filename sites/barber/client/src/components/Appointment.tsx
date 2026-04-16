import { useState } from "react";
import { Calendar, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
  "5:00 PM", "6:00 PM"
];

const reservedSlots = [
  { date: "2025-01-02", time: "10:00 AM" },
  { date: "2025-01-02", time: "2:00 PM" },
  { date: "2025-01-03", time: "11:00 AM" },
];

function getNextWeekDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }
  return dates;
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function formatDisplayDate(date: Date, language: string) {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: "short", 
    month: "short", 
    day: "numeric" 
  };
  return date.toLocaleDateString(language === "ua" ? "uk-UA" : "en-US", options);
}

export function Appointment() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const logo = `${import.meta.env.BASE_URL}assets/favicon.jpg`;

  const availableDates = getNextWeekDates();

  const isSlotReserved = (date: Date, time: string) => {
    const dateStr = formatDate(date);
    return reservedSlots.some(
      (slot) => slot.date === dateStr && slot.time === time
    );
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsConfirmed(true);
    toast({
      title: t.appointment.confirmed,
      description: `${formatDisplayDate(selectedDate, language)} at ${selectedTime}`,
    });
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setIsConfirmed(false);
  };

  return (
    <section
      id="appointment"
      className="py-20 md:py-28 bg-muted/30"
      data-testid="section-appointment"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 
            className="font-display text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-4"
            data-testid="text-appointment-title"
          >
            {t.appointment.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.appointment.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <Card className="overflow-visible">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="font-display text-xl uppercase tracking-wide">
                    {t.appointment.hours}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {t.appointment.availability}
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={logo}
                    alt="Latinos Barbershop"
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-wide">
                      Latinos Barbershop
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Little Rock, AR
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-visible" data-testid="card-booking">
            <CardContent className="p-6 md:p-8">
              {isConfirmed ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-foreground mb-2">
                    {t.appointment.confirmed}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {selectedDate && formatDisplayDate(selectedDate, language)} at {selectedTime}
                  </p>
                  <Button variant="outline" onClick={resetBooking} data-testid="button-book-another">
                    Book Another
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">
                        {t.appointment.selectDate}
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {availableDates.map((date) => (
                        <button
                          key={formatDate(date)}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedTime(null);
                          }}
                          className={`p-3 rounded-md text-sm font-medium transition-colors ${
                            selectedDate && formatDate(selectedDate) === formatDate(date)
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-foreground"
                          }`}
                          data-testid={`button-date-${formatDate(date)}`}
                        >
                          {formatDisplayDate(date, language)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">
                          {t.appointment.selectTime}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((time) => {
                          const reserved = isSlotReserved(selectedDate, time);
                          return (
                            <button
                              key={time}
                              onClick={() => !reserved && setSelectedTime(time)}
                              disabled={reserved}
                              className={`p-3 rounded-md text-sm font-medium transition-colors ${
                                reserved
                                  ? "bg-muted/50 text-muted-foreground cursor-not-allowed line-through"
                                  : selectedTime === time
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted hover:bg-muted/80 text-foreground"
                              }`}
                              data-testid={`button-time-${time.replace(/\s/g, "-")}`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleConfirm}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-primary text-primary-foreground font-semibold uppercase tracking-wide"
                    data-testid="button-confirm-appointment"
                  >
                    {t.appointment.confirm}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
