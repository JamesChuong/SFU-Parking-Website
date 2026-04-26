import datetime
from datetime import datetime

from datetime import date

from django.forms import model_to_dict

# Temporary solution for calculating semester
FALL_SEMESTER_MONTHS = ["09", "10", "11", "12"]
SPRING_SEMESTER_MONTHS = ["01", "02", "03", "04"]
SUMMER_SEMESTER_MONTHS = ["05", "06", "07", "08"]


def get_current_term_code():
    today = date.today()
    century = int(today.strftime("%C"))
    x = ((century + 1) % 10) * 1000
    y = (int(today.year) % 100) * 10
    z = get_current_term_code_season()
    return x + y + z


def get_current_year():
    return date.today().year


def get_current_term_code_season():
    month = date.today().strftime("%m")
    if month in SPRING_SEMESTER_MONTHS:
        return 1

    elif month in SUMMER_SEMESTER_MONTHS:
        return 4

    else:
        return 7


SPRING_SEM_MONTHS = {1, 2, 3, 4}
SUMMER_SEM_MONTHS = {5, 6, 7, 8}
FALL_SEM_MONTHS = {9, 10, 11, 12}


def get_term_from_month(month):
    if month in SPRING_SEM_MONTHS:
        return "spring"
    elif month in SUMMER_SEM_MONTHS:
        return "summer"
    else:
        return "fall"


def get_current_term():
    return get_term_from_month(date.today().month)


from datetime import datetime


class CourseTimeConflictException(Exception):
    pass


def to_time(t: str):
    return datetime.strptime(t, "%H:%M").time()


def parse_days(days: str):
    return [day.strip() for day in days.split(",") if day.strip()]


# Helper function for building a map of days to course events for conflict checking
def build_day_to_event_map(courses):
    day_to_event = {}

    for section in courses:
        for block in section.schedule:
            for day in parse_days(block["days"]):
                map_entry = {
                    "section": section,
                    "time_block": block,
                }

                if day not in day_to_event:
                    day_to_event[day] = []

                day_to_event[day].append(map_entry)

    return day_to_event


def check_course_conflicts(block1, block2):
    start_time1 = to_time(block1["startTime"])
    end_time1 = to_time(block1["endTime"])

    start_time2 = to_time(block2["startTime"])
    end_time2 = to_time(block2["endTime"])

    return start_time1 < end_time2 and start_time2 < end_time1


def check_time_conflicts(courses: list[dict]):
    if not courses:
        return

    day_to_event_map = build_day_to_event_map(courses)
    conflicts = []

    for day, events in day_to_event_map.items():
        for i in range(len(events)):
            for j in range(i + 1, len(events)):
                event1 = events[i]
                event2 = events[j]

                section1 = event1["section"]
                section2 = event2["section"]

                if section1 == section2:
                    continue

                if check_course_conflicts(
                    event1["time_block"],
                    event2["time_block"]
                ):
                    conflicts.append({
                        "day": day,
                        "section1": section1,
                        "section2": section2,
                        "time_block1": event1["time_block"],
                        "time_block2": event2["time_block"],
                    })

    if conflicts:
        raise CourseTimeConflictException(f'These sections are conflicting: {conflicts}')


# Checks if course data in the DB is from a previous semester and runs the cron job if so
def refresh_courses_if_stale():
    from core.models import LectureSection
    from core.cron import update_course_data

    first_section = LectureSection.objects.first()
    current_year = get_current_year()
    current_term = get_current_term()

    is_stale = (
        not first_section or
        not first_section.start_date or
        first_section.start_date.year != current_year or
        get_term_from_month(first_section.start_date.month) != current_term
    )

    if is_stale:
        update_course_data.delay()
