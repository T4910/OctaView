import React from 'react'

function Index() {
  return (
    <div>
      <h1>Staff Timetable</h1>
      <table id="data_Table" class="display dataTable no-footer" cellspacing="0" width="100%" role="grid" aria-describedby="data_Table_info">
        <thead>
          <tr bgcolor="#C2CBD0" role="row"><td colspan="12" align="center" rowspan="1">Weekly Lecture Timetable</td></tr>
          <tr bgcolor="#C2CBD0" role="row"><td class="sorting_asc" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-sort="ascending" aria-label="SN: activate to sort column ascending">SN</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="DAYS: activate to sort column ascending">DAYS</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="08-09: activate to sort column ascending">08-09</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="09-10: activate to sort column ascending">09-10</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="10-11: activate to sort column ascending">10-11</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="11-12: activate to sort column ascending">11-12</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="12-01: activate to sort column ascending">12-01</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="01-02: activate to sort column ascending">01-02</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="02-03: activate to sort column ascending">02-03</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="03-04: activate to sort column ascending">03-04</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="04-05: activate to sort column ascending">04-05</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="05-06: activate to sort column ascending">05-06</td></tr>
        </thead>
        <tbody>
          <tr role="row" class="odd"><td class="sorting_1">1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="even"><td class="sorting_1">2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="odd"><td class="sorting_1">3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="even"><td class="sorting_1">4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="odd"><td class="sorting_1">5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="even"><td class="sorting_1">6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody>

        {/* Examination Timetable */}

        <thead>
          <tr bgcolor="#C2CBD0">
            <td colspan="12" align="center">Examination Week One Timetable</td>
          </tr>
          <tr bgcolor="#C2CBD0">
            <td>SN</td>
            <td>DAYS</td>
            <td>08-09</td>
            <td>09-10</td>
            <td>10-11</td>
            <td>11-12</td>
            <td>12-01</td>
            <td>01-02</td>
            <td>02-03</td>
            <td>03-04</td>
            <td>04-05</td>
            <td>05-06</td>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>    </tbody>

        <thead>
          <tr bgcolor="#C2CBD0">
            <td colspan="12" align="center">Examination Week Two Timetable</td>
          </tr>
          <tr bgcolor="#C2CBD0">
            <td>SN</td>
            <td>DAYS</td>
            <td>08-09</td>
            <td>09-10</td>
            <td>10-11</td>
            <td>11-12</td>
            <td>12-01</td>
            <td>01-02</td>
            <td>02-03</td>
            <td>03-04</td>
            <td>04-05</td>
            <td>05-06</td>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>    </tbody>

        <thead>
          <tr bgcolor="#C2CBD0">
            <td colspan="12" align="center">Examination Week Three Timetable</td>
          </tr>
          <tr bgcolor="#C2CBD0">
            <td>SN</td>
            <td>DAYS</td>
            <td>08-09</td>
            <td>09-10</td>
            <td>10-11</td>
            <td>11-12</td>
            <td>12-01</td>
            <td>01-02</td>
            <td>02-03</td>
            <td>03-04</td>
            <td>04-05</td>
            <td>05-06</td>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>    </tbody>

        <thead>
          <tr bgcolor="#C2CBD0">
            <td colspan="12" align="center">Examination Week Four Timetable</td>
          </tr>
          <tr bgcolor="#C2CBD0">
            <td>SN</td>
            <td>DAYS</td>
            <td>08-09</td>
            <td>09-10</td>
            <td>10-11</td>
            <td>11-12</td>
            <td>12-01</td>
            <td>01-02</td>
            <td>02-03</td>
            <td>03-04</td>
            <td>04-05</td>
            <td>05-06</td>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>    </tbody>

        <thead>
          <tr bgcolor="#C2CBD0">
            <td colspan="12" align="center">Examination Week Five Timetable</td>
          </tr>
          <tr bgcolor="#C2CBD0">
            <td>SN</td>
            <td>DAYS</td>
            <td>08-09</td>
            <td>09-10</td>
            <td>10-11</td>
            <td>11-12</td>
            <td>12-01</td>
            <td>01-02</td>
            <td>02-03</td>
            <td>03-04</td>
            <td>04-05</td>
            <td>05-06</td>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>    </tbody>

        <thead>
          <tr bgcolor="#C2CBD0">
            <td colspan="12" align="center">Examination Week Six Timetable</td>
          </tr>
          <tr bgcolor="#C2CBD0">
            <td>SN</td>
            <td>DAYS</td>
            <td>08-09</td>
            <td>09-10</td>
            <td>10-11</td>
            <td>11-12</td>
            <td>12-01</td>
            <td>01-02</td>
            <td>02-03</td>
            <td>03-04</td>
            <td>04-05</td>
            <td>05-06</td>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>    </tbody>

        <thead>
          <tr bgcolor="#C2CBD0">
            <td colspan="12" align="center">Examination Week Seven Timetable</td>
          </tr>
          <tr bgcolor="#C2CBD0">
            <td>SN</td>
            <td>DAYS</td>
            <td>08-09</td>
            <td>09-10</td>
            <td>10-11</td>
            <td>11-12</td>
            <td>12-01</td>
            <td>01-02</td>
            <td>02-03</td>
            <td>03-04</td>
            <td>04-05</td>
            <td>05-06</td>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>    </tbody>
      </table>
    </div>
  )
}

export default Index