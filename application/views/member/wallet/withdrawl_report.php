<?php

/***************************************************************************************************
 * Copyright (c) 2020. by Camwel Corporate Solution PVT LTD
 * This project is developed and maintained by Camwel Corporate Solution PVT LTD.
 * Nobody is permitted to modify the source or any part of the project without permission.
 * Project Developer: Camwel Corporate Solution PVT LTD
 * Developed for: Camwel Corporate Solution PVT LTD
 **************************************************************************************************/

$top_id = $this->session->user_id;
$status = $this->uri->segment('3') ? $this->uri->segment('3') : '';
$sdate  = $this->uri->segment('4') ? $this->uri->segment('4') : '';
$edate  = $this->uri->segment('5') ? $this->uri->segment('5') : '';
$this->db->where('userid', htmlentities($top_id));
if ($status !== "") {
    $this->db->where('status', $status);
}
if ($sdate !== "") {
    $this->db->where('date >=', $sdate);
}
if ($edate !== "") {
    $this->db->where('date <=', $edate);
}

$data = $this->db->get('withdraw_request')->result();
?>


<form method="post" action="">
        <div class="row" style="max-width: 100% !important;">
        <div class="col-sm-6">
            <label>Status</label>
            <select name="status" class="form-control">
                <option selected>Paid</option>
                <option>Un-Paid</option>
                <option>Hold</option>
            </select>
        </div>

        <div class="col-sm-6">
            <label>Start Date</label>
            <input type="text" readonly class="form-control datepicker" name="sdate">
        </div>

        <div class="col-sm-6">
            <label>End Date</label>
            <input type="text" readonly class="form-control datepicker" name="edate">
        </div>

        <div class="col-sm-6">
           
            <button type="submit" class="btn btn-primary">Search</button>
        </div>

    </div>
    </form>




<div class="row">
    <div class="col-sm-12" style="overflow-x: auto;">
        <table id="example" class="table table-responsive table-striped ">
            <thead>
                <tr>
                    <th>S.N.</th>
                    <th>User ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Transaction Detail</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $page=$this->uri->segment(3);
                $sn = ($page=='')?0:$page;
                foreach ($data as $e) {

                ?>
                    <tr>
                        <td><?php echo ++$sn; ?></td>
                        <td><?php echo config_item('ID_EXT') . $e->userid ?></td>
                        <td><?php echo config_item('currency') . $e->amount ?></td>
                        <td><?php echo $e->date ?></td>
                        <td><?php echo $e->status ?></td>
                        <td><?php echo $e->tid ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>

    </div>
</div>